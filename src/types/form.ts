import { z } from "zod";

// Form schema for validation
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  signature: z.string().min(1, "Signature is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to submit this letter",
  }),
  oregonCitizen: z.boolean().refine((val) => val === true, {
    message: "You must confirm you are an Oregon Citizen",
  }),
  burdenAcknowledgment: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this statement",
  }),
  issuesAcknowledgment: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this statement",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

// PDF processing status
export type ProcessingStatus = "idle" | "processing" | "success" | "error";

// PDF document response
export type PDFResponse = {
  url: string;
  public_id: string;
};

// Admin types
export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};

export type Post = {
  id: string;
  description: string;
  file_url: string | null;
  file_name: string | null;
  created_at: string;
  updated_at: string;
  admin_id: string;
};
