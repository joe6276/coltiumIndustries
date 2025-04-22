import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import * as z from 'zod'

// Form validation schema (repeated from the frontend for security)
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json()
    const result = formSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid form data' },
        { status: 400 }
      )
    }
    
    const { name, organization, email, message } = result.data
    
    // Configure Zoho SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    })
    
    // Define the recipient emails - supporting multiple recipients
    // Get all possible recipient emails from environment variables
    const primaryEmail = process.env.CONTACT_EMAIL || process.env.ZOHO_EMAIL
    
    // Get additional recipient emails from environment variables
    const additionalEmails = []
    if (process.env.ALTERNATE_CONTACT_EMAIL_1) additionalEmails.push(process.env.ALTERNATE_CONTACT_EMAIL_1)
    if (process.env.ALTERNATE_CONTACT_EMAIL_2) additionalEmails.push(process.env.ALTERNATE_CONTACT_EMAIL_2)
    if (process.env.ALTERNATE_CONTACT_EMAIL_3) additionalEmails.push(process.env.ALTERNATE_CONTACT_EMAIL_3)
    
    // Combine all recipient emails
    const allRecipients = [primaryEmail, ...additionalEmails].filter(Boolean)
    
    // Set up email content
    const mailOptions = {
      from: process.env.ZOHO_EMAIL,
      to: allRecipients.join(', '), // Joining all recipients with commas
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Organization: ${organization || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }
    
    // Send the email
    await transporter.sendMail(mailOptions)
    
    // Send a confirmation email to the user (optional)
    const confirmationMail = {
      from: process.env.ZOHO_EMAIL,
      to: email,
      subject: 'Thank You for Contacting Coltium Industries',
      text: `
        Dear ${name},
        
        Thank you for contacting Coltium Industries. We have received your message and will get back to you shortly.
        
        Best regards,
        The Coltium Industries Team
      `,
      html: `
        <h2>Thank You for Contacting Coltium Industries</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Coltium Industries. We have received your message and will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Coltium Industries Team</p>
      `,
    }
    
    await transporter.sendMail(confirmationMail)
    
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}