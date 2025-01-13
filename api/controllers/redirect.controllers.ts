import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/error.middlewares";
import { ErrorResponse } from "../utils/errorResponse";
import { prisma } from "../configs/prisma";

const redirectHandler = asyncHandler(async (req: Request, res: Response) => {
  try {
    const code = req.params.id;
    const urlRecord = await prisma.urlShortener.findFirst({
      where: {
        code: code,
      },
      select: {
        destinationUrl: true,
      },
    });
    if (urlRecord) {
      res.redirect(301, urlRecord.destinationUrl);
    } else {
      console.log("Record not found");
      new ErrorResponse("URL don't exists in the database", 404);
    }
  } catch (error) {
    console.log("Redirect error", error);
    new ErrorResponse("Internal server error", 500);
  }
});

export { redirectHandler };
