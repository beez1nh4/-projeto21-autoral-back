import { AuthenticatedRequest } from "@/middlewares";
import rewardService from "@/services/reward-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getRewardsByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const rewards = await rewardService.getRewardsByUserId(userId);

    if (!rewards) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(rewards);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRewardById(req: AuthenticatedRequest, res: Response) {
  try {
    const rewardId = Number(req.params.rewardId);
    const { userId } = req;

    if (!rewardId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const reward = await rewardService.getRewardById(userId, rewardId);

    if (!reward) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(reward);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postReward(req: AuthenticatedRequest, res: Response) {
  try {
    const rewardData = req.body;

    if (!rewardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const reward = await rewardService.createReward(rewardData);

    if (!reward) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(reward);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteRewardById(req: AuthenticatedRequest, res: Response) {
  try {
    const rewardId = Number(req.params.rewardId);
    const { userId } = req;

    if (!rewardId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const reward = await rewardService.deleteReward(userId, rewardId);

    if (!reward) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(reward);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateRewardById(req: AuthenticatedRequest, res: Response) {
    try {
      const rewardId = Number(req.params.rewardId);
      const { userId } = req;
      const data = req.body;
  
      if (!rewardId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const reward = await rewardService.updateReward(userId, rewardId, data);
  
      if (!reward) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(reward);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
