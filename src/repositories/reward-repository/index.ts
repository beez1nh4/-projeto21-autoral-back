import { prisma } from "@/config";
import { Reward } from "@prisma/client";

async function findRewardsByUserId(userId: number) {
  return prisma.reward.findMany({
    where: {
      userId,
    }
  });
}

async function createReward(params: RewardParams) {
  return prisma.reward.create({
    data: {
      ...params,
    }
  });
}

async function findRewardById(rewardId: number) {
    return prisma.reward.findFirst({
      where: {
        id: rewardId,
      }
    });
}

async function deleteRewardById(rewardId: number) {
    return prisma.reward.delete({
      where: {
        id: rewardId,
      }
    });
}

async function updateRewardById(rewardId: number, data: RewardParams) {
    return prisma.reward.update({
      where: {
        id: rewardId,
      },
      data
    });
}

export type RewardParams = Omit<Reward, "id" | "createdAt" | "updatedAt">

const rewardRepository = {
  findRewardsByUserId,
  createReward,
  findRewardById,
  deleteRewardById,
  updateRewardById
};

export default rewardRepository;