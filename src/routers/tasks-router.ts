import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteTaskById, getTasksByUserId, getTaskById, postTask, updateTaskById } from "@/controllers";

const tasksRouter = Router();

tasksRouter
  .all("/*", authenticateToken)
  .get("/", getTasksByUserId)
  .get("/:taskId", getTaskById)
  .post("/", postTask)
  .delete("/:taskId", deleteTaskById)
  .put("/:taskId", updateTaskById);

export { tasksRouter };