import { Router } from "express";

import { createUserSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getUserById, usersPost } from "@/controllers";

const usersRouter = Router();

usersRouter
.post("/", validateBody(createUserSchema), usersPost)
.get("/", authenticateToken, getUserById);

export { usersRouter };
