import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB, connectCache, disconnectCache } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import { 
  activitiesRouter, 
  authenticationRouter, 
  hobbiesRouter, 
  linksRouter, 
  progressRouter, 
  rewardsRouter, 
  studiesRouter, 
  subjectsRouter, 
  tasksRouter, 
  usersRouter, 
  weeklyActivitiesRouter 
} from "@/routers";


const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/user", usersRouter)
  .use("/subject", subjectsRouter)
  .use("/activity", activitiesRouter)
  .use("/weekly", weeklyActivitiesRouter)
  .use("/hobby", hobbiesRouter)
  .use("/task", tasksRouter)
  .use("/reward", rewardsRouter)
  .use("/study", studiesRouter)
  .use("/link", linksRouter)
  .use("/progress", progressRouter)
  .use("/auth", authenticationRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  connectCache();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  await disconnectCache();
}

export default app;
