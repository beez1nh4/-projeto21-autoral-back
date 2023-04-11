import { notFoundError, unauthorizedError } from "@/errors";
import taskRepository, { TaskData } from "@/repositories/task-repository";

async function getTasksByUserId(userId: number) {

  const tasks = await taskRepository.findTasksByUserId(userId);

  if (!tasks) {
    throw notFoundError();
  }
  return tasks;
}

async function getTaskById(userId: number, taskId: number) {

    const task = await taskRepository.findTaskById(taskId);
  
    if (!taskId) {
      throw notFoundError();
    }

    if (task.userId !== userId){
      throw unauthorizedError();
    }

    return task;
}

async function createTask(taskData: TaskData) {

  const task = await taskRepository.createTask(taskData);

  return task;
}

async function deleteTask(userId: number, taskId: number) {
  
  const task = await taskRepository.findTaskById(taskId); 

  if (task.userId !== userId){
    throw unauthorizedError();
  }
  await taskRepository.deleteTaskById(taskId);
  
  return task;
}

async function updateTask(userId: number, taskId: number, data: TaskData) {
  
    const task = await taskRepository.findTaskById(taskId); 
  
    if (task.userId !== userId){
      throw unauthorizedError();
    }
    const updatedTask = await taskRepository.updateTaskyById(taskId, data);
    
    return updatedTask;
}

const taskService = {
  getTasksByUserId,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};

export default taskService;
