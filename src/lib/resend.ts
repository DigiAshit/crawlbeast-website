import { Resend } from 'resend'

type NotificationEmail = {
  subject: string
  text: string
  replyTo?: string
}

type WelcomeEmail = {
  to: string
}

const welcomeText = `Welcome to CrawlBeast!

Hey,

My name is Ashit, I'm the founder and CEO of CrawlBeast.

I built CrawlBeast because technical SEO audits should not feel like digging through endless reports.

Finding SEO issues is easy. Understanding which ones actually matter and fixing them is what makes the difference.

1. Find and Fix Your SEO Errors in 5 Minutes
https://www.youtube.com/watch?v=BkzVltXm25o

2. SEO in 2026: The New Rules for Google & AI Rankings
https://www.youtube.com/watch?v=Se6F__vrWXA

3. How to Fix "Discovered – Currently Not Indexed" in Google Search Console
https://www.youtube.com/watch?v=sKlDpgD0pUY

P.S. What brought you to CrawlBeast?

Hit "Reply" and let me know. We read and reply to every email.

Cheers,
Ashit`

const welcomeHtml = `<!doctype html>
<html>
  <body style="margin:0;background:#ffffff;color:#171717;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:32px 20px;font-size:16px;line-height:1.65;">
      <h1 style="margin:0 0 28px;font-size:28px;line-height:1.2;">Welcome to CrawlBeast!</h1>
      <p>Hey,</p>
      <p>My name is Ashit, I'm the founder and CEO of CrawlBeast.</p>
      <p>I built CrawlBeast because technical SEO audits should not feel like digging through endless reports.</p>
      <p>Finding SEO issues is easy. Understanding which ones actually matter and fixing them is what makes the difference.</p>
      <ol style="padding-left:24px;margin:24px 0;">
        <li style="margin-bottom:14px;"><a href="https://www.youtube.com/watch?v=BkzVltXm25o" style="color:#2563eb;">Find and Fix Your SEO Errors in 5 Minutes</a></li>
        <li style="margin-bottom:14px;"><a href="https://www.youtube.com/watch?v=Se6F__vrWXA" style="color:#2563eb;">SEO in 2026: The New Rules for Google &amp; AI Rankings</a></li>
        <li style="margin-bottom:14px;"><a href="https://www.youtube.com/watch?v=sKlDpgD0pUY" style="color:#2563eb;">How to Fix &quot;Discovered – Currently Not Indexed&quot; in Google Search Console</a></li>
      </ol>
      <p><strong>P.S. What brought you to CrawlBeast?</strong></p>
      <p>Hit &quot;Reply&quot; and let me know. We read and reply to every email.</p>
      <p style="margin-top:28px;">Cheers,<br>Ashit</p>
    </div>
  </body>
</html>`

function getWelcomeFrom() {
  const configuredFrom = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const address = configuredFrom.match(/<([^>]+)>/)?.[1] || configuredFrom
  return `Ashit from CrawlBeast <${address}>`
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

export async function sendWelcomeEmail({ to }: WelcomeEmail) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing. Welcome email was not sent.')
    return null
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: getWelcomeFrom(),
    to,
    replyTo:
      process.env.RESEND_REPLY_TO ||
      process.env.NOTIFICATION_EMAIL ||
      'marketing.boutiques@gmail.com',
    subject: 'Welcome to CrawlBeast!',
    text: welcomeText,
    html: welcomeHtml,
  })

  if (error) {
    throw new Error(`Resend failed: ${error.message}`)
  }

  return data?.id ?? null
}
