import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());

app.get(`/api/${process.env.API_VERSION}/health`, (_, res) => {
  res.send("This site is healthy");
});
app.use(`/api/${process.env.API_VERSION}/content`, router);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
