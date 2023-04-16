import { AuthenticatedRequest } from "@/middlewares";
import taskService from "@/services/task-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTasksByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const tasks = await taskService.getTasksByUserId(userId);

    if (!tasks) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(tasks);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTaskById(req: AuthenticatedRequest, res: Response) {
  try {
    const taskId = Number(req.params.taskId);
    const { userId } = req;

    if (!taskId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const task = await taskService.getTaskById(userId, taskId);

    if (!task) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTask(req: AuthenticatedRequest, res: Response) {
  try {
    const taskData = req.body;

    if (!taskData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const task = await taskService.createTask(taskData);

    if (!task) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteTaskById(req: AuthenticatedRequest, res: Response) {
  try {
    const taskId = Number(req.params.taskId);
    const { userId } = req;

    if (!taskId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const task = await taskService.deleteTask(userId, taskId);

    if (!task) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateTaskById(req: AuthenticatedRequest, res: Response) {
    try {
      const taskId = Number(req.params.taskId);
      const { userId } = req;
      const data = req.body;
  
      if (!taskId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const task = await taskService.updateTask(userId, taskId, data);
  
      if (!task) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(task);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
