/* eslint-disable @typescript-eslint/no-explicit-any */
import html2pdf from "html2pdf.js";

export const generatePDFasync = async (element: HTMLElement): Promise<File> => {
  return new Promise((resolve) => {
    const opt = {
      margin: 0,
      enableLinks: true,
      filename: "Legal_Letter.pdf",
      image: { type: "jpeg", quality: 0.60 },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf: any) => {
        const blob = pdf.output("blob");
        const file = new File([blob], "Legal_Letter.pdf", { type: "application/pdf" });
        resolve(file);
      });
  });
};

