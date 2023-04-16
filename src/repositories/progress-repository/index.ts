import { prisma } from "@/config";
import { Progress } from "@prisma/client";

async function findProgressByUserId(userId: number) {
  return prisma.progress.findMany({
    where: {
      userId,
    }
  });
}

async function createProgress(params: ProgressParams) {
  return prisma.progress.create({
    data: {
      ...params,
    }
  });
}

async function findProgressById(progressId: number) {
    return prisma.progress.findFirst({
      where: {
        id: progressId,
      }
    });
}

async function deleteProgressById(progressId: number) {
    return prisma.progress.delete({
      where: {
        id: progressId,
      }
    });
}

async function updateProgressById(progressId: number, data: ProgressParams) {
    return prisma.progress.update({
      where: {
        id: progressId,
      },
      data
    });
}

export type ProgressParams = Omit<Progress, "id" | "createdAt" | "updatedAt">


const progressRepository = {
  findProgressByUserId,
  createProgress,
  findProgressById,
  deleteProgressById,
  updateProgressById
};

export default progressRepository;