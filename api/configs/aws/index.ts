import { env, loadEnvFile } from "node:process";
import { S3Client } from "@aws-sdk/client-s3";

loadEnvFile(".env");

const s3Client = new S3Client({
  region: `${env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export { s3Client };
