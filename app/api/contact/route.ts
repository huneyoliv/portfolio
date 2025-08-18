import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Here you would integrate with your preferred email service
    // For now, we'll simulate a successful response
    console.log("Contact form submission:", { name, email, message })

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
