import { Router } from "express";
import { redirectHandler } from "../controllers/redirect.controllers";

const redirectRouter = Router();
redirectRouter.route("/:id").get(redirectHandler);

export { redirectRouter };
