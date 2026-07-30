import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import nodemailer from 'nodemailer'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u4287n71',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json()

    // 1. Validation
    if (!firstName || !firstName.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }
    if (!lastName || !lastName.trim()) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 })
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email must be valid' }, { status: 400 })
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()

    // 2. Save to Sanity under document type "contact"
    let docId = ''
    try {
      const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN
      if (!token) {
        console.warn('Sanity write token is missing. Contact document will not be created in Sanity.')
      } else {
        const result = await writeClient.create({
          _type: 'contact',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : undefined,
          message: message.trim(),
          submittedAt: timestamp,
        })
        docId = result._id
      }
    } catch (err) {
      console.error('Failed to save contact query to Sanity:', err)
      // Continue so that email is sent even if Sanity write fails
    }

    // 3. Send Email Notification
    const emailSubject = 'New CrawlBeast Contact Message'
    const emailBody = `Name: ${firstName.trim()} ${lastName.trim()}
Email: ${email.trim()}
Phone: ${phone ? phone.trim() : 'N/A'}
Message:
${message.trim()}

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
        from: `"CrawlBeast Contacts" <${user}>`,
        to: toEmail,
        subject: emailSubject,
        text: emailBody,
      })
      console.log(`Email contact notification sent to ${toEmail}`)
    } else {
      console.log('--- SMTP Not Configured. Printing Contact Email Notification ---')
      console.log(`Subject: ${emailSubject}`)
      console.log(emailBody)
      console.log('----------------------------------------------------------------')
    }

    return NextResponse.json({ success: true, docId })
  } catch (error: any) {
    console.error('Error handling contact form submission:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
