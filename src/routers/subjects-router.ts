import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getSubjectsByUserId, getSubjectById, postSubject, deleteSubjectById, updateSubjectById } from "@/controllers";

const subjectsRouter = Router();

subjectsRouter
  .all("/*", authenticateToken)
  .get("/", getSubjectsByUserId)
  .get("/:subjectId", getSubjectById)
  .post("/", postSubject)
  .delete("/:subjectId", deleteSubjectById)
  .put("/:subjectId", updateSubjectById);

export { subjectsRouter };
