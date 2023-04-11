import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { deleteRewardById, getRewardsByUserId, getRewardById, postReward, updateRewardById } from "@/controllers";

const rewardsRouter = Router();

rewardsRouter
  .all("/*", authenticateToken)
  .get("/", getRewardsByUserId)
  .get("/:rewardId", getRewardById)
  .post("/", postReward)
  .delete("/:rewardId", deleteRewardById)
  .put("/:rewardId", updateRewardById);

export { rewardsRouter };