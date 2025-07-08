'use server'; // This special directive marks this as a Server Action file.

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// This is the function our form will call.
export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const senderEmail = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This is a default for testing, can be changed later.
      to: 'marketcatalyst@gmail.com', // **IMPORTANT: Replace with your actual email address.**
      subject: `Message from Revolution5 Contact Form from ${name}`,
      reply_to: senderEmail,
      text: `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: 'Failed to send email.' };
  }
}