import { Resend } from 'resend'

type NotificationEmail = {
  subject: string
  text: string
  replyTo?: string
}

export async function sendNotificationEmail({
  subject,
  text,
  replyTo,
}: NotificationEmail) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing. Email notification was not sent.')
    return null
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: process.env.NOTIFICATION_EMAIL || 'marketing.boutiques@gmail.com',
    replyTo,
    subject,
    text,
  })

  if (error) {
    throw new Error(`Resend failed: ${error.message}`)
  }

  return data?.id ?? null
}
