import { Request, Response } from "express";
import { createSignedUrl } from "../libs";

const getUploadUrl = async (req: Request, res: Response) => {
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
  }
};

export { getUploadUrl };
