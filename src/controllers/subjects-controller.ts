import { AuthenticatedRequest } from "@/middlewares";
import subjectService from "@/services/subject-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getSubjectsByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const subjects = await subjectService.getSubjectsByUserId(userId);

    if (!subjects) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(subjects);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getSubjectById(req: AuthenticatedRequest, res: Response) {
  try {
    const subjectId = Number(req.query.subjectId);
    const { userId } = req;

    if (!subjectId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const subject = await subjectService.getSubjectById(userId, subjectId);

    if (!subject) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(subject);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postSubject(req: AuthenticatedRequest, res: Response) {
  try {
    const subjectData = req.body;

    if (!subjectData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const subject = await subjectService.createSubject(subjectData);

    if (!subject) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(subject);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteSubjectById(req: AuthenticatedRequest, res: Response) {
  try {
    const subjectId = Number(req.query.subjectId);
    const { userId } = req;

    if (!subjectId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const subject = await subjectService.deleteSubject(userId, subjectId);

    if (!subject) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(subject);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}