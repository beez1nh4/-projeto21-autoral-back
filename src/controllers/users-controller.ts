import { AuthenticatedRequest } from "@/middlewares";
import userService from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const { email, password, username, birthday, photoUrl } = req.body;
  try {
    const user = await userService.createUser({ email, password, username, birthday, photoUrl });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      username: user.username,
      birthday: user.birthday.toISOString(),
      photoUrl: user.photoUrl,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {  
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getUserById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    if (!userId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}