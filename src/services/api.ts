import html2pdf from "html2pdf.js";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

// Function for PDF upload
export const uploadFormAsync = async (pdfBlob: Blob): Promise<string> => {
  const pdfFile = new File([pdfBlob], "Legal_Letter.pdf", { type: "application/pdf" });
  const formData = new FormData();
  formData.append("file", pdfFile);
  formData.append("upload_preset","legal_pdf"); // Replace with yours
  formData.append("cloud_name", "diccuaubj"); // Replace with yours

  const res = await axios.post(`https://api.cloudinary.com/v1_1/diccuaubj/raw/upload`, formData);
  if (res.status !== 200) {
    toast({
      title: "Error",
      description: "There was an error uploading your PDF. Please try again.",
      variant: "destructive",
    });
    throw new Error("Failed to upload PDF");
  } else {
    toast({
      title: "Success!",
      description: "Your PDF has been successfully uploaded.",
    });
  }

  return res.data.secure_url; // The final downloadable URL
};


// Function to handle backend API integration (to be implemented later)
export const generatePDFasync = async (element: HTMLElement): Promise<Blob> => {
  return new Promise((resolve) => {
    const opt = {
      margin: 0.5,
      filename: "Legal_Letter.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
    .set(opt)
    .from(element)
    .outputPdf("blob")
    .then((pdfBlob: Blob) => {
      resolve(pdfBlob);
    });
  });
};
