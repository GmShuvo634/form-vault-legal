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
  agreement: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;

// PDF processing status
export type ProcessingStatus = "idle" | "processing" | "success" | "error";

// PDF document response
export type PDFResponse = {
  url: string;
  public_id: string;
};
