import { env, loadEnvFile } from "node:process";
import { nanoid } from "nanoid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../configs/aws";

loadEnvFile(".env");

const createSignedUrl = async (filename: string, mimeType: string) => {
  const file = `reo-${filename}-${nanoid(6)}.${mimeType}`;
  const command = new PutObjectCommand({
    Bucket: `${env.AWS_BUCKET_NAME}`,
    Key: `${env.S3_DIR_PATH}/${file}`,
    ContentType: mimeType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: Number(`${env.SIGNEDURL_EXPIRE_DURATION}`),
  });
  return signedUrl;
};

export { createSignedUrl };
