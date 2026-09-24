import { Resend } from 'resend'

const recipient = 'info@geo-pesa.com'
const sender = 'info@geo-pesa.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { intent, organization, type, country, discussion, ticket, questions, name, email, phone, method } = body

    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim() || !email.includes('@')) {
      return Response.json({ error: 'Name and a valid email are required.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[v0] Contact email failed: RESEND_API_KEY is not configured')
      return Response.json({ error: 'Unable to send your message right now.' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send(
      {
        from: `GeoPesa Website <${sender}>`,
        to: [recipient],
        replyTo: email.trim(),
        subject: `New GeoPesa enquiry from ${name.trim()}`,
        text: [
          `Name: ${name.trim()}`,
          `Email: ${email.trim()}`,
          `Phone: ${phone || 'Not provided'}`,
          `Preferred contact method: ${method || 'Email'}`,
          `Intent: ${intent || 'Not provided'}`,
          `Organization: ${organization || 'Not provided'}`,
          `Organization type: ${type || 'Not provided'}`,
          `Country: ${country || 'Not provided'}`,
          `Discussion: ${discussion || 'Not provided'}`,
          `Indicative ticket: ${ticket || 'Not provided'}`,
          `Questions: ${questions || 'Not provided'}`,
        ].join('\n'),
      },
      { idempotencyKey: `contact-form/${crypto.randomUUID()}` },
    )

    if (error) {
      console.error('[v0] Contact email failed:', error.message)
      return Response.json({ error: 'Unable to send your message right now.' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('[v0] Contact form request failed:', error)
    return Response.json({ error: 'Unable to send your message right now.' }, { status: 500 })
  }
}
