import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteProgressById, getProgressById, getProgressByUserId, postProgress, updateProgressById } from "@/controllers";

const progressRouter = Router();

progressRouter
  .all("/*", authenticateToken)
  .get("/", getProgressByUserId)
  .get("/:progressId", getProgressById)
  .post("/", postProgress)
  .delete("/:progressId", deleteProgressById)
  .put("/:progressId", updateProgressById);

export { progressRouter };