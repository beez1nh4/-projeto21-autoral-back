import { notFoundError, unauthorizedError } from "@/errors";
import activityRepository, { ActivityParams } from "@/repositories/activity-repository";

async function getActivitiesByUserId(userId: number) {

  const activities = await activityRepository.findActivitiesByUserId(userId);

  if (!activities) {
    throw notFoundError();
  }
  return activities;
}

async function getActivityById(userId: number, activityId: number) {

    const activity = await activityRepository.findActivityById(activityId);
  
    if (!activity) {
      throw notFoundError();
    }

    if (activity.userId !== userId){
      throw unauthorizedError();
    }

    return activity;
}

async function createActivity(activityData: ActivityParams) {

  const activity = await activityRepository.createActivity(activityData);

  return activity;
}

async function deleteActivity(userId: number, activityId: number) {
  
  const activity = await activityRepository.findActivityById(activityId); 

  if (activity.userId !== userId){
    throw unauthorizedError();
  }
  await activityRepository.deleteActivityById(activityId);
  
  return activity;
}

const activityService = {
  getActivitiesByUserId,
  getActivityById,
  createActivity,
  deleteActivity
};

export default activityService;
