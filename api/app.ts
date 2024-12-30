import { env, loadEnvFile } from "node:process";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import router from "./routes";

loadEnvFile(".env");
const PORT = env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(hpp());
app.use(helmet());

app.use(`/api/${env.API_VERSION}/content`, router);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
