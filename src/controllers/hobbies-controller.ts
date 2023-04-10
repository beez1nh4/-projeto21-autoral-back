import { AuthenticatedRequest } from "@/middlewares";
import hobbyService from "@/services/hobby-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHobbiesByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const hobbies = await hobbyService.getHobbiesByUserId(userId);

    if (!hobbies) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hobbies);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHobbyById(req: AuthenticatedRequest, res: Response) {
  try {
    const hobbyId = Number(req.query.hobbyId);
    const { userId } = req;

    if (!hobbyId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const hobby = await hobbyService.getHobbyById(userId, hobbyId);

    if (!hobby) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hobby);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postHobby(req: AuthenticatedRequest, res: Response) {
  try {
    const hobbyData = req.body;

    if (!hobbyData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const hobby = await hobbyService.createHobby(hobbyData);

    if (!hobby) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(hobby);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteHobbyById(req: AuthenticatedRequest, res: Response) {
  try {
    const hobbyId = Number(req.query.hobbyId);
    const { userId } = req;

    if (!hobbyId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const hobby = await hobbyService.deleteHobby(userId, hobbyId);

    if (!hobby) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hobby);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateHobbyById(req: AuthenticatedRequest, res: Response) {
    try {
      const hobbyId = Number(req.query.hobbyId);
      const { userId } = req;
      const { status } = req.body;
  
      if (!hobbyId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const hobby = await hobbyService.updateHobby(userId, hobbyId, status);
  
      if (!hobby) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(hobby);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
