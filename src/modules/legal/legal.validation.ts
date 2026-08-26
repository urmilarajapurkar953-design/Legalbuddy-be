import { z } from "zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    version: z.string().optional(),
    sourceUrl: z.string().url("Invalid URL").optional(),
  }),
});

export type UploadDocumentBody =
  z.infer<typeof uploadDocumentSchema>["body"];