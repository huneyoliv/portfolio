import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import xss from "xss"
import { rateLimitByIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin") || ""
    const host = request.headers.get("host") || ""
    const allowedOrigin = process.env.ALLOWED_ORIGIN || ""

    if (allowedOrigin && origin && !origin.includes(allowedOrigin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1"
    const rl = rateLimitByIp(ip, 5, 60_000)
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } })
    }

    const body = await request.json()

    const Schema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email().max(200),
      message: z.string().min(10).max(2000),
    })

    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const name = xss(parsed.data.name)
    const email = xss(parsed.data.email)
    const message = xss(parsed.data.message)

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send Email via Resend (optional)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || "no-reply@devhuney.me",
        to: process.env.CONTACT_EMAIL_TO,
        subject: `Novo contato do site: ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
      })
    }

    // Send Telegram message (optional)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
      const text = `📩 Novo contato recebido:%0A%0A👤 Nome: ${encodeURIComponent(name)}%0A✉️ Email: ${encodeURIComponent(email)}%0A📝 Mensagem: ${encodeURIComponent(message)}`
      await fetch(`${telegramUrl}?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${text}`)
    }

    // You can integrate with services like:
    // - EmailJS
    // - SendGrid
    // - Nodemailer
    // - Resend
    // - etc.

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
