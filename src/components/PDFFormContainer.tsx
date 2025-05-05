import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema, ProcessingStatus } from "@/types/form";
import PDFForm from "./PDFForm";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { generatePDFasync } from "@/services/api";
import LetterTemplate from "./template/LetterTemplate";
import { sendEmailWithAttachment } from "@/services/email.service";
import CreatePost from "./CreatePost";
import PostList from "./PostLIst";
import { useAuth } from "@/contexts/AuthContext";
import ReactPlayer from "react-player";

const PDFFormContainer: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      signature: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("processing");
    try {
      // In a real application, this would call your backend API
      console.log("Form data submitted:", data);
      if (letterRef.current) {
        const pdfFile = await generatePDFasync(letterRef.current);
        await sendEmailWithAttachment(pdfFile, data);
        console.log("PDF Blob:", pdfFile);
        setPdfFile(pdfFile);
      }
      setStatus("success");
      toast({
        title: "Success!",
        description:
          "Your form has been processed and a PDF has been generated.",
      });
    } catch (error) {
      console.error("Error processing form:", error);
      setStatus("error");
      toast({
        title: "Error",
        description:
          "There was an error processing your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="mt-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Help Oust Kotek!
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to create, store, and share your legal
            documents with ease
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 mt-6">
        {/* place a video player */}
        <div className="">
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=diccuaubj&public_id=gxgj0rtaicrrxgrpl9tm&profile=cld-default"
            width="640"
            height="360"
            className="rounded"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          ></iframe>
        </div>
        <Card className="w-full max-w-4xl mx-auto border-none ">
          <CardHeader>
            <CardDescription>
              Explore the case files and submit a letter to the Oregon Supreme
              Court. Please complete this form to generate a letter to the
              Oregon Supreme Court acknowledging the following: 1. You are an
              Oregon Citizen. 2. You know that the burden of proof is on
              Christine Kotek. 3. The issues of first impression need to be
              conclusively resolved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PDFForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={status === "processing"}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        {user ? (
          <div className="mt-4">
            <CreatePost />
          </div>
        ) : null}
      </div>
      <div className="mt-4">
        <PostList />
      </div>
      <div className="hidden">
        <div className="mt-8 " ref={letterRef}>
          <LetterTemplate
            name={form.getValues("name")}
            date={form.getValues("date")?.toISOString().split("T")[0]}
            signature={form.getValues("signature")}
            addressLine1={form.getValues("addressLine1")}
            addressLine2={form.getValues("addressLine2")}
            addressLine3={form.getValues("addressLine3")}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFFormContainer;
