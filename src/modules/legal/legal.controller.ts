import { Request, Response } from "express";
import { legalService } from "./legal.service";

export class LegalController {
  static uploadDocument = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    const document = await legalService.uploadDocument(
      req.body,
      req.file.buffer,
    );

    return res.status(201).json({
      document,
    });
  };
}