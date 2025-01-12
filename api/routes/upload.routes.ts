import { Router } from "express";
import { getUploadUrl } from "../controllers";

const uploadRouter = Router();

uploadRouter.route("/").post(getUploadUrl);

export default uploadRouter;
