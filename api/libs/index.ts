import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../configs/aws";

dotenv.config();

const createSignedUrl = async (filename: string, mimeType: string) => {
  const file = `${filename}-${nanoid(6)}.${mimeType}`;
  const command = new PutObjectCommand({
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: `${process.env.AWS_S3_DIR_PATH}/${file}`,
    ContentType: mimeType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: Number(`${process.env.AWS_SIGNEDURL_EXPIRE_DURATION}`),
  });
  return signedUrl;
};

export { createSignedUrl };
