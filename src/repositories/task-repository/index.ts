import { prisma } from "@/config";
import { Task } from "@prisma/client";

async function findTasksByUserId(userId: number) {
  return prisma.task.findMany({
    where: {
      userId,
    }
  });
}

async function createTask(params: TaskData) {
  return prisma.task.create({
    data: {
      ...params,
    }
  });
}

async function findTaskById(taskId: number) {
    return prisma.task.findFirst({
      where: {
        id: taskId,
      }
    });
}

async function deleteTaskById(taskId: number) {
    return prisma.task.delete({
      where: {
        id: taskId,
      }
    });
}

async function updateTaskById(taskId: number, data: TaskData) {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data
    });
}

export type TaskData = Omit<Task, "id" | "createdAt" | "updatedAt">

const taskRepository = {
  findTasksByUserId,
  createTask,
  findTaskById,
  deleteTaskById,
  updateTaskById
};

export default taskRepository;