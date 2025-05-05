/* eslint-disable @typescript-eslint/no-explicit-any */

interface EmailData {
  to: string;
  subject: string;
  message: string;
  attachment: string;
}

// Mock email service that simulates sending an email
export async function sendEmail(data: EmailData): Promise<void> {
  console.log("Sending email with data:", data);

  // In a real application, this would integrate with EmailJS
  // For now, we'll simulate a successful email send after a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate for testing
        console.log("Email sent successfully");
        resolve();
      } else {
        console.error("Failed to send email");
        reject(new Error("Failed to send email"));
      }
    }, 1000);
  });
}

// To be implemented with actual EmailJS integration
export async function initEmailJS(): Promise<void> {
  // Initialize EmailJS with your user ID
  console.log("EmailJS initialized");
}

import { FormValues } from "@/types/form";
import emailjs from "@emailjs/browser";

export const sendEmailWithAttachment = async (
  file: File,
  formData: FormValues
) => {
  const reader = new FileReader();

  reader.onload = async () => {
    const base64PDF = reader.result as string;

    // file size limit check (optional)
    if (base64PDF.length > 10 * 1024 * 1024) {
      console.error("File size exceeds 10MB limit");
      return;
    }

    const templateParams = {
      to_email: "Letter@oustkotek.com",
      to_name: formData.name,
      from_name: "Appellate Court Administrator",
      message: "Here is your PDF!",
      content: base64PDF, // Extract base64 part
    };

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS!", response.status, response.text);
    } catch (err) {
      console.error("FAILED...", err);
    }
  };

  reader.readAsDataURL(file); // read file as base64
};
