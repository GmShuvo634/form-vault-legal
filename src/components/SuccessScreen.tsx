
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { sendEmail } from "@/services/email";
import { CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SuccessScreenProps {
  pdfUrl: string;
  email: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ pdfUrl, email }) => {
  useEffect(() => {
    const sendEmailNotification = async () => {
      try {
        await sendEmail({
          to: email,
          subject: "Your Filed Legal PDF",
          message: `Thank you for using our service! Your PDF has been generated and is available for download at: ${pdfUrl}`,
          pdfUrl: pdfUrl,
        });
        toast({
          title: "Email Sent",
          description: `A confirmation email has been sent to ${email}`,
        });
      } catch (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Email Error",
          description: "There was an issue sending the confirmation email. Your PDF is still available for download.",
          variant: "destructive",
        });
      }
    };

    sendEmailNotification();
  }, [pdfUrl, email]);

  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
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
