import { notFoundError, unauthorizedError } from "@/errors";
import rewardRepository, { RewardParams } from "@/repositories/reward-repository";

async function getRewardsByUserId(userId: number) {

  const rewards = await rewardRepository.findRewardsByUserId(userId);

  if (!rewards) {
    throw notFoundError();
  }
  return rewards;
}

async function getRewardById(userId: number, rewardId: number) {

    const reward = await rewardRepository.findRewardById(rewardId);
  
    if (!rewardId) {
      throw notFoundError();
    }

    if (reward.userId !== userId){
      throw unauthorizedError();
    }

    return reward;
}

async function createReward(rewardData: RewardParams) {

  const reward = await rewardRepository.createReward(rewardData);

  return reward;
}

async function deleteReward(userId: number, rewardId: number) {
  
  const reward = await rewardRepository.findRewardById(rewardId); 

  if (reward.userId !== userId){
    throw unauthorizedError();
  }
  
  await rewardRepository.deleteRewardById(rewardId);
  
  return reward;
}

async function updateReward(userId: number, rewardId: number, data: RewardParams) {
  
    const reward = await rewardRepository.findRewardById(rewardId); 
  
    if (reward.userId !== userId){
      throw unauthorizedError();
    }
    const updatedReward = await rewardRepository.updateRewardById(rewardId, data);
    
    return updatedReward;
}

const rewardService = {
  getRewardsByUserId,
  getRewardById,
  createReward,
  deleteReward,
  updateReward
};

export default rewardService;