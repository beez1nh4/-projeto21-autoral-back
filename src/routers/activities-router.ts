import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivitiesByUserId, getActivityById, postActivity, deleteActivityById, updateActivityById } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivitiesByUserId)
  .get("/:activityId", getActivityById)
  .post("/", postActivity)
  .delete("/:activityId", deleteActivityById)
  .put("/:activityId", updateActivityById);

export { activitiesRouter };