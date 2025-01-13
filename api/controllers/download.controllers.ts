import { Request, Response } from "express";
import humanId from "human-id";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { prisma } from "../configs/prisma";
import { asyncHandler } from "../middlewares/error.middlewares";
import { ErrorResponse } from "../utils/errorResponse";
import { SHORT_URL_EXPIRY_DURATION_IN_MINUTES } from "../configs/constants";

const getDownloadUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const destinationUrl = req.body.url;
    const shortCode = humanId({
      adjectiveCount: 1,
      separator: "-",
      capitalize: false,
    });

    dayjs.extend(utc);
    const timestamp = dayjs();
    const expiryDate = timestamp
      .add(SHORT_URL_EXPIRY_DURATION_IN_MINUTES, "minute")
      .utc()
      .format();
    await prisma.urlShortener.create({
      data: {
        destinationUrl,
        code: shortCode.toString(),
        isActive: true,
        expiresAt: expiryDate,
      },
    });

    res.status(201).json({
      success: true,
      data: [
        {
          downloadCode: shortCode,
          expiresAt: expiryDate,
        },
      ],
    });
  } catch (error) {
    console.error("Error in url shortener: ", error);
    new ErrorResponse("Internal server error", 500);
  }
});

export { getDownloadUrl };
