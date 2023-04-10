import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getSubjectsByUserId, getSubjectById, postSubject, deleteSubjectById } from "@/controllers";

const subjectsRouter = Router();

subjectsRouter
  .all("/*", authenticateToken)
  .get("/", getSubjectsByUserId)
  .get("/:subjectId", getSubjectById)
  .post("/", postSubject)
  .delete("/:subjectId", deleteSubjectById);

export { subjectsRouter };
