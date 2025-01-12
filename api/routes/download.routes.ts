import { Router } from "express";
import { getDownloadUrl } from "../controllers";

const downloadRouter = Router();

downloadRouter.route("/").post(getDownloadUrl);

export default downloadRouter;
