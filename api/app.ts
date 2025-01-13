import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import { downloadRouter } from "./routes/download.routes";
import { uploadRouter } from "./routes/upload.routes";
import { redirectRouter } from "./routes/redirect.routes";

dotenv.config();

const PORT = process.env.PORT || 8000;
const API_VERSION = process.env.API_VERSION || "v1";
const app: Application = express();

//TODO: Rate limiter
//TODO: Logging using prometheus

app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());

app.use(`/api/${API_VERSION}/content`, uploadRouter);
app.use(`/api/${API_VERSION}/download`, downloadRouter);

app.get(`/api/${API_VERSION}/health`, (_, res) => {
  res.status(200).json({
    success: true,
    message: "Site is healthy",
  });
});

app.use("/", redirectRouter);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
