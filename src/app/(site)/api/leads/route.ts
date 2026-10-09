import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { sendNotificationEmail, sendWelcomeEmail } from '@/lib/resend'

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

    const normalizedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Email must be valid' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()

    // 2. Save to Sanity under document type "lead"
    let docId = ''
    try {
      if (!process.env.SANITY_WRITE_TOKEN) {
        console.warn(
          'SANITY_WRITE_TOKEN is missing. Lead document will not be created in Sanity.'
        )
      } else {
        const result = await writeClient.create({
          _type: 'lead',
          name: normalizedName,
          email: normalizedEmail,
          submittedAt: timestamp,
        })
        docId = result._id
      }
    } catch (err) {
      console.error('Failed to save lead to Sanity:', err)
      // Continue so that we send email even if Sanity write fails
    }

    // 3. Send the internal lead notification
    const emailSubject = 'New CrawlBeast Lead'
    const emailBody = `Name: ${normalizedName}
Email: ${normalizedEmail}
Submitted: ${timestamp}`

    const emailId = await sendNotificationEmail({
      subject: emailSubject,
      text: emailBody,
      replyTo: normalizedEmail,
    })

    if (emailId) {
      console.log(`Resend lead notification sent (${emailId})`)
    }

    // 4. Send the new user their welcome email without blocking signup on failure
    try {
      const welcomeEmailId = await sendWelcomeEmail({ to: normalizedEmail })
      if (welcomeEmailId) {
        console.log(`Resend welcome email sent (${welcomeEmailId})`)
      }
    } catch (welcomeError) {
      console.error('Failed to send CrawlBeast welcome email:', welcomeError)
    }

    return NextResponse.json({ success: true, docId })
  } catch (error) {
    console.error('Error handling lead submission:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
