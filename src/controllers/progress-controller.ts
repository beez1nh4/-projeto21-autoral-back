import { AuthenticatedRequest } from "@/middlewares";
import progressService from "@/services/progress-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getProgressByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const progress = await progressService.getProgressByUserId(userId);

    if (!progress) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(progress);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getProgressById(req: AuthenticatedRequest, res: Response) {
  try {
    const progressId = Number(req.params.progressId);
    const { userId } = req;

    if (!progressId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const progress = await progressService.getProgressById(userId, progressId);

    if (!progress) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(progress);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postProgress(req: AuthenticatedRequest, res: Response) {
  try {
    const progressData = req.body;

    if (!progressData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const progress = await progressService.createProgress(progressData);

    if (!progress) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(progress);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteProgressById(req: AuthenticatedRequest, res: Response) {
  try {
    const progressId = Number(req.params.progressId);
    const { userId } = req;

    if (!progressId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const progress = await progressService.deleteProgress(userId, progressId);

    if (!progress) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(progress);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateProgressById(req: AuthenticatedRequest, res: Response) {
    try {
      const progressId = Number(req.params.progressId);
      const { userId } = req;
      const data = req.body;
  
      if (!progressId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const progress = await progressService.updateProgress(userId, progressId, data);
  
      if (!progress) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(progress);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
