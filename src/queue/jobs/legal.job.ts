import { Job } from "bullmq";
import { PDFParse } from "pdf-parse";
import logger from "../../common/logger";
import { embeddingService } from "../../common/utils/embeddings";
import prisma from "../../config/prisma";

export interface LegalJobData {
  documentId: string;
  fileBase64: string;
  title: string;
}

const createChunks = (text: string, chunkSize = 1000) => {
  const chunks: string[] = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
};

export const processLegalDocument = async (
  job: Job<LegalJobData>,
) => {
  const { documentId, fileBase64, title } = job.data;

  try {
    logger.info(
      { documentId, jobId: job.id },
      "Starting PDF processing",
    );

    const fileBuffer = Buffer.from(fileBase64, "base64");

    const parser = new PDFParse({
      data: fileBuffer,
    });

    const textResult = await parser.getText();

    const content = textResult.text;

    if (!content || content.trim().length === 0) {
      throw new Error("Could not extract text from PDF");
    }

    const chunks = createChunks(content);

    console.log("Total chunks:", chunks.length);

    for (const chunk of chunks) {
      const embedding = await embeddingService.generate(chunk);

      console.log("Embedding length:", embedding.length);

      await prisma.$executeRaw`
        INSERT INTO "DocumentChunk" (
          "documentId",
          "content",
          "embedding"
        )
        VALUES (
          ${documentId},
          ${chunk},
          ${embedding}::vector
        )
      `;
        console.log("Chunk saved successfully");

    }

    logger.info(
      {
        documentId,
        title,
        textLength: content.length,
        chunksCreated: chunks.length,
      },
      "PDF processed and chunks stored successfully",
    );

  } catch (error) {
    logger.error(
      { error, documentId },
      "Failed to process legal document",
    );

    throw error;
  }
};