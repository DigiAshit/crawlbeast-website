import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import nodemailer from 'nodemailer'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u4287n71',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    // 1. Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email must be valid' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()

    // 2. Save to Sanity under document type "lead"
    let docId = ''
    try {
      if (!process.env.SANITY_WRITE_TOKEN) {
        console.warn('SANITY_WRITE_TOKEN is missing. Lead document will not be created in Sanity.')
      } else {
        const result = await writeClient.create({
          _type: 'lead',
          name: name.trim(),
          email: email.trim().toLowerCase(),
          submittedAt: timestamp,
        })
        docId = result._id
      }
    } catch (err) {
      console.error('Failed to save lead to Sanity:', err)
      // Continue so that we send email even if Sanity write fails
    }

    // 3. Send Email Notification
    const emailSubject = 'New CrawlBeast Lead'
    const emailBody = `Name: ${name.trim()}
Email: ${email.trim()}
Submitted: ${timestamp}`

    const host = process.env.SMTP_HOST
    const port = parseInt(process.env.SMTP_PORT || '587', 10)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const toEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'support@crawlbeast.com'

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      })

      await transporter.sendMail({
        from: `"CrawlBeast Leads" <${user}>`,
        to: toEmail,
        subject: emailSubject,
        text: emailBody,
      })
      console.log(`Email notification sent to ${toEmail}`)
    } else {
      console.log('--- SMTP Not Configured. Printing Lead Email Notification ---')
      console.log(`Subject: ${emailSubject}`)
      console.log(emailBody)
      console.log('------------------------------------------------------------')
    }

    return NextResponse.json({ success: true, docId })
  } catch (error: any) {
    console.error('Error handling lead submission:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
