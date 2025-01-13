import { Router } from "express";
import { getDownloadUrl } from "../controllers/download.controllers";

const downloadRouter = Router();

downloadRouter.route("/").post(getDownloadUrl);

export { downloadRouter };
