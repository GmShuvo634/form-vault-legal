/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormValues } from "@/types/form";
import emailjs from "@emailjs/browser";
interface EmailData {
  to: string;
  subject: string;
  message: string;
  attachment: string;
}

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
