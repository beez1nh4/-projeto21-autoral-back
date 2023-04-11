import { AuthenticatedRequest } from "@/middlewares";
import studyService from "@/services/study-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getStudySessionsByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const studySessions = await studyService.getStudySessionsByUserId(userId);

    if (!studySessions) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(studySessions);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getStudySessionById(req: AuthenticatedRequest, res: Response) {
  try {
    const studySessionId = Number(req.query.studySessionId);
    const { userId } = req;

    if (!studySessionId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const studySession = await studyService.getStudySessionById(userId, studySessionId);

    if (!studySession) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(studySession);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postStudySession(req: AuthenticatedRequest, res: Response) {
  try {
    const studySessionData = req.body;

    if (!studySessionData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const studySession = await studyService.createStudySession(studySessionData);

    if (!studySession) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(studySession);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteStudySessionById(req: AuthenticatedRequest, res: Response) {
  try {
    const studySessionId = Number(req.query.studySessionId);
    const { userId } = req;

    if (!studySessionId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const studySession = await studyService.deleteStudySession(userId, studySessionId);

    if (!studySession) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(studySession);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateStudySessionById(req: AuthenticatedRequest, res: Response) {
    try {
      const studySessionId = Number(req.query.studySessionId);
      const { userId } = req;
      const data = req.body;
  
      if (!studySessionId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const studySession = await studyService.updateStudySession(userId, studySessionId, data);
  
      if (!studySession) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(studySession);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
