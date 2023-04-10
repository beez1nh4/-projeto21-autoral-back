import { prisma } from "@/config";
import { Activity } from "@prisma/client";

async function findActivitiesByUserId(userId: number) {
  return prisma.activity.findMany({
    where: {
      userId,
    }
  });
}

async function createActivity(params: ActivityParams) {
  return prisma.activity.create({
    data: {
      ...params,
    }
  });
}

async function findActivityById(activityId: number) {
    return prisma.activity.findFirst({
      where: {
        id: activityId,
      }
    });
}

async function deleteActivityById(activityId: number) {
    return prisma.activity.delete({
      where: {
        id: activityId,
      }
    });
}

export type ActivityParams = Omit<Activity, "id" | "createdAt" | "updatedAt">

const activityRepository = {
  findActivitiesByUserId,
  createActivity,
  findActivityById,
  deleteActivityById
};

export default activityRepository;
