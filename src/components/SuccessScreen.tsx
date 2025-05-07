import { useEffect } from "react";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
interface SuccessScreenProps {
  pdfFile: File;
  email: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ pdfFile, email }) => {
  const blobUrl = URL.createObjectURL(pdfFile);

  // useEffect(() => {
  //   const sendEmailNotification = async () => {
  //     try {
  //       const file = new File([pdfFile], "document.pdf", { type: "application/pdf" });
  //       const reader = new FileReader();
  //       const base64String = await new Promise<string>((resolve) => {
  //         reader.onloadend = () => {
  //           const base64 = reader.result?.toString().split(',')[1] || '';
  //           resolve(base64);
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //       await sendEmail({
  //         to: email,
  //         subject: "Your Filed Legal PDF",
  //         message: "Thank you for using our service! Your PDF is attached to this email.",
  //         attachment: base64String,
  //       });
  //       toast({
  //         title: "Email Sent",
  //         description: `A confirmation email has been sent to ${email}`,
  //       });
  //     } catch (error) {
  //       console.error("Error sending email:", error);
  //       toast({
  //         title: "Email Error",
  //         description: "There was an issue sending the confirmation email. Your PDF is still available for download.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   sendEmailNotification();
  // }, [pdfFile, email]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "Legal_letter.pdf";
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-primary">Success!</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Your form has been processed successfully. Your PDF is ready to download and a copy has been emailed to {email}.
      </p>
      <div className="pt-4">
        <Button onClick={handleDownload} className="w-full md:w-auto">
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
