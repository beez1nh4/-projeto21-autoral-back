import { AuthenticatedRequest } from "@/middlewares";
import weeklyActivityService from "@/services/weekly-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getWeeklyActivitiesByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const weeklyActivities = await weeklyActivityService.getWeeklyActivitiesByUserId(userId);

    if (!weeklyActivities) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(weeklyActivities);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getWeeklyActivityById(req: AuthenticatedRequest, res: Response) {
  try {
    const weeklyActivityId = Number(req.params.weeklyActivityId);
    const { userId } = req;

    if (!weeklyActivityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const weeklyActivity = await weeklyActivityService.getWeeklyActivityById(userId, weeklyActivityId);

    if (!weeklyActivity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(weeklyActivity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postWeeklyActivity(req: AuthenticatedRequest, res: Response) {
  try {
    const weeklyActivityData = req.body;

    if (!weeklyActivityData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const weeklyActivity = await weeklyActivityService.createWeeklyActivity(weeklyActivityData);

    if (!weeklyActivity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(weeklyActivity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteWeeklyActivityById(req: AuthenticatedRequest, res: Response) {
  try {
    const weeklyActivityId = Number(req.params.weeklyActivityId);
    const { userId } = req;

    if (!weeklyActivityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const weeklyActivity = await weeklyActivityService.deleteWeeklyActivity(userId, weeklyActivityId);

    if (!weeklyActivity) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(weeklyActivity);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function updateWeeklyActivityById(req: AuthenticatedRequest, res: Response) {
    try {
      const weeklyActivityId = Number(req.params.weeklyActivityId);
      const { userId } = req;
      const { status } = req.body;
  
      if (!weeklyActivityId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const weeklyActivity = await weeklyActivityService.updateWeeklyActivity(userId, weeklyActivityId, status);
  
      if (!weeklyActivity) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(weeklyActivity);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }