import { prisma } from "@/config";
import { ActionStatus, WeeklyActivity } from "@prisma/client";

async function findWeeklyActivitiesByUserId(userId: number) {
  return prisma.weeklyActivity.findMany({
    where: {
      userId,
    }
  });
}

async function createWeeklyActivity(params: WeeklyActivityParams) {
  return prisma.weeklyActivity.create({
    data: {
      ...params,
    }
  });
}

async function findWeeklyActivityById(weeklyActivityId: number) {
    return prisma.weeklyActivity.findFirst({
      where: {
        id: weeklyActivityId,
      }
    });
}

async function deleteWeeklyActivityById(weeklyActivityId: number) {
    return prisma.weeklyActivity.delete({
      where: {
        id: weeklyActivityId,
      }
    });
}

async function updateWeeklyActivityById(weeklyActivityId: number, status: ActionStatus) {
    return prisma.weeklyActivity.update({
      where: {
        id: weeklyActivityId,
      },
      data:{
        status
      }
    });
}

export type WeeklyActivityParams = Omit<WeeklyActivity, "id" | "createdAt" | "updatedAt">

const weeklyActivityRepository = {
  findWeeklyActivitiesByUserId,
  createWeeklyActivity,
  findWeeklyActivityById,
  deleteWeeklyActivityById,
  updateWeeklyActivityById
};

export default weeklyActivityRepository;
