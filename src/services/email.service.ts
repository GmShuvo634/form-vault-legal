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

    console.log("Base64 PDF:", base64PDF.length / 1024 / 1024, "MB"); // Log the size in MB

    const templateParams = {
      to_email: "to_email",
      to_name: formData.name,
      from_name: "Appellate Court Administrator",
      message: "Here is your PDF!",
      content: base64PDF, // Extract base64 part
    };

    try {
      const response = await emailjs.send(
        "service_jthic1f", // e.g., 'service_abc123'
        "template_814bsps", // e.g., 'template_xyz456'
        templateParams,
        "tExxj-bheNbcXjn12" // e.g., '12345_publicKey'
      );

      console.log("SUCCESS!", response.status, response.text);
    } catch (err) {
      console.error("FAILED...", err);
    }
  };

  reader.readAsDataURL(file); // read file as base64
};
