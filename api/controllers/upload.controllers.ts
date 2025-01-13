import { Request, Response } from "express";
import { createSignedUrl } from "../libs";
import { asyncHandler } from "../middlewares/error.middlewares";
import { ErrorResponse } from "../utils/errorResponse";

const getUploadUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { filename, type } = req.body;
    const uploadUrl = await createSignedUrl(filename, type);
    res.status(200).json({
      success: true,
      data: {
        uploadUrl,
      },
    });
  } catch (error) {
    console.log("Error in creating presigned URL: ", error);
    new ErrorResponse("Internal server error", 500);
  }
});
export { getUploadUrl };
