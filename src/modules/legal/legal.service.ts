import prisma from "../../config/prisma";
import { UploadDocumentBody } from "./legal.validation";
import { queueService } from "../../queue/services/queue.service";

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

    await queueService.addLegalDocumentJob({
      documentId: document.id,
      fileBase64: fileBuffer.toString("base64"),
      title: data.title,
    });

    return document;
  }
}

export const legalService = new LegalService();