import { Router } from "express";
import { getUploadUrl } from "../controllers";

const router = Router();

router.route("/").post(getUploadUrl);

export default router;
