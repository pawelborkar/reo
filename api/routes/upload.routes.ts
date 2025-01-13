import { Router } from "express";
import { getUploadUrl } from "../controllers/upload.controllers";

const uploadRouter = Router();

uploadRouter.route("/").post(getUploadUrl);

export { uploadRouter };
