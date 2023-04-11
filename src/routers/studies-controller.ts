import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteStudySessionById, getStudySessionById, getActivityById, postStudySession, updateStudySessionById, getStudySessionsByUserId } from "@/controllers";

const studiesRouter = Router();

studiesRouter
  .all("/*", authenticateToken)
  .get("/", getStudySessionsByUserId)
  .get("/:studySessionId", getStudySessionById)
  .post("/", postStudySession)
  .delete("/:studySessionId", deleteStudySessionById)
  .put("/:studySessionId", updateStudySessionById);

export { studiesRouter };