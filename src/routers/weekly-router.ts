import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getWeeklyActivitiesByUserId, getWeeklyActivityById, postWeeklyActivity, deleteWeeklyActivityById, updateWeeklyActivityById } from "@/controllers";

const weeklyActivitiesRouter = Router();

weeklyActivitiesRouter
  .all("/*", authenticateToken)
  .get("/", getWeeklyActivitiesByUserId)
  .get("/:weeklyActivityId", getWeeklyActivityById)
  .post("/", postWeeklyActivity)
  .delete("/:weeklyActivityId", deleteWeeklyActivityById)
  .put("/:weeklyActivityId", updateWeeklyActivityById);

export { weeklyActivitiesRouter };