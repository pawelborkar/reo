import { env, loadEnvFile } from "node:process";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

loadEnvFile(".env");
const client = new S3Client({
  region: `${env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${env.AWS_SECRET_ACCESS_KEY}`,
  },
});

const generatePresignedPostUrl = async (req: Request, res: Response) => {
  const fileType = req.body.fileType;
  console.log("File Type: ", fileType);
  const fileKey = `uploads/reo-${nanoid(6)}.${fileType}`;

  try {
    const { url, fields } = await createPresignedPost(client, {
      Bucket: `${env.AWS_BUCKET_NAME}`,
      Key: fileKey,
      Conditions: [
        ["content-length-range", 0, 10485760],
        ["starts-with", "$Content-Type", "image/"],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": fileType,
      },
      Expires: 600,
    });

    res.json({
      success: true,
      data: {
        url,
        fields,
        fileKey,
      },
    });

    // return { url, fields, fileKey };
  } catch (error) {
    console.log("Error in creating presigned URL: ", error);
  }
};

export { generatePresignedPostUrl };
