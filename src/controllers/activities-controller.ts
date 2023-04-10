import { AuthenticatedRequest } from "@/middlewares";
import activityService from "@/services/activity-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivitiesByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const activities = await activityService.getActivitiesByUserId(userId);

    if (!activities) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getActivityById(req: AuthenticatedRequest, res: Response) {
  try {
    const activityId = Number(req.query.activityId);
    const { userId } = req;

    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const activity = await activityService.getActivityById(userId, activityId);

    if (!activity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postActivity(req: AuthenticatedRequest, res: Response) {
  try {
    const activityData = req.body;

    if (!activityData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const activity = await activityService.createActivity(activityData);

    if (!activity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteActivityById(req: AuthenticatedRequest, res: Response) {
  try {
    const activityId = Number(req.query.activityId);
    const { userId } = req;

    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const activity = await activityService.deleteActivity(userId, activityId);

    if (!activity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}