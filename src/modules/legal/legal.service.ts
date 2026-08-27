import prisma from "../../config/prisma";
import { UploadDocumentBody } from "./legal.validation";

export class LegalService {
  async uploadDocument(
    data: UploadDocumentBody,
    fileBuffer: Buffer,
  ) {
    const document = await prisma.legalDocument.create({
      data: {
        title: data.title,
        category: data.category,
        version: data.version,
        sourceUrl: data.sourceUrl,
      },
    });

    console.log("PDF received:", fileBuffer.length, "bytes");

    return document;
  }
}

export const legalService = new LegalService();