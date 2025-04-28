
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema, ProcessingStatus } from "@/types/form";
import { uploadForm } from "@/services/api";
import PDFForm from "./PDFForm";
import SuccessScreen from "./SuccessScreen";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const PDFFormContainer: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      signature: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("processing");
    try {
      // In a real application, this would call your backend API
      const response = await uploadForm(data);
      setPdfUrl(response.url);
      setStatus("success");
      toast({
        title: "Success!",
        description: "Your form has been processed and a PDF has been generated.",
      });
    } catch (error) {
      console.error("Error processing form:", error);
      setStatus("error");
      toast({
        title: "Error",
        description: "There was an error processing your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">PDF Filler and Submission Portal</CardTitle>
          <CardDescription>
            Fill out the form below to generate your legal document. Once completed, you'll receive a PDF copy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "success" && pdfUrl ? (
            <SuccessScreen pdfUrl={pdfUrl} email={form.getValues("email")} />
          ) : (
            <PDFForm form={form} onSubmit={onSubmit} isSubmitting={status === "processing"} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFFormContainer;
