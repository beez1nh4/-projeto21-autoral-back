import { notFoundError, unauthorizedError } from "@/errors";
import { ProgressParams } from "@/repositories";
import progressRepository from "@/repositories/progress-repository";

async function getProgressByUserId(userId: number) {

  const progress = await progressRepository.findProgressByUserId(userId);

  if (!progress) {
    throw notFoundError();
  }
  return progress;
}

async function getProgressById(userId: number, progressId: number) {

    const progress = await progressRepository.findProgressById(progressId);
  
    if (!progressId) {
      throw notFoundError();
    }

    if (progress.userId !== userId){
      throw unauthorizedError();
    }

    return progress;
}

async function createProgress(progressData: ProgressParams) {

  const progress = await progressRepository.createProgress(progressData);

  return progress;
}

async function deleteProgress(userId: number, progressId: number) {
  
  const progress = await progressRepository.findProgressById(progressId); 

  if (progress.userId !== userId){
    throw unauthorizedError();
  }
  await progressRepository.deleteProgressById(progressId);
  
  return progress;
}

async function updateProgress(userId: number, progressId: number, data: ProgressParams) {
  
    const progress = await progressRepository.findProgressById(progressId); 
  
    if (progress.userId !== userId){
      throw unauthorizedError();
    }
    const updatedProgress = await progressRepository.updateProgressById(progressId, data);
    
    return updatedProgress;
}

const progressService = {
  getProgressByUserId,
  getProgressById,
  createProgress,
  deleteProgress,
  updateProgress
};

export default progressService;
