import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB, connectCache, disconnectCache } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import { authenticationRouter, subjectsRouter, usersRouter } from "@/routers";
import { activitiesRouter } from "./routers/activities-router.";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/subjects", subjectsRouter)
  .use("/activities", activitiesRouter)
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
