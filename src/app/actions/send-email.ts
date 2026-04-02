"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  details: string;
}) {
  const { fullName, email, phone, projectType, details } = formData;

  try {
    const { data, error } = await resend.emails.send({
      from: "BAI Contact Form <onboarding@resend.dev>", // Replace with your domain once verified
      to: ["manojarya0207@gmail.com"],
      subject: `New Inquiry: ${projectType} from ${fullName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Project Inquiry</h2>
          <p><strong>From:</strong> ${fullName} (&lt;${email}&gt;)</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1;">
            <strong>Details:</strong><br/>
            ${details.replace(/\n/g, "<br/>")}
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8em; color: #999; text-align: center;">This message was sent from the Bharath Aadhya Intelligence Contact Form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("General Error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
