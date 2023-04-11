import { notFoundError, unauthorizedError } from "@/errors";
import studyRepository, { StudyParams } from "@/repositories/study-repository";

async function getStudySessionsByUserId(userId: number) {

  const studySessions = await studyRepository.findStudySessionsByUserId(userId);

  if (!studySessions) {
    throw notFoundError();
  }
  return studySessions;
}

async function getStudySessionById(userId: number, studySessionId: number) {

    const studySession = await studyRepository.findStudySessionById(studySessionId);
  
    if (!studySessionId) {
      throw notFoundError();
    }

    if (studySession.userId !== userId){
      throw unauthorizedError();
    }

    return studySession;
}

async function createStudySession(studySessionData: StudyParams) {

  const studySession = await studyRepository.createStudySession(studySessionData);

  return studySession;
}

async function deleteStudySession(userId: number, studySessionId: number) {
  
  const studySession = await studyRepository.findStudySessionById(studySessionId); 

  if (studySession.userId !== userId){
    throw unauthorizedError();
  }
  await studyRepository.deleteStudySessionById(studySessionId);
  
  return studySession;
}

async function updateStudySession(userId: number, studySessionId: number, data: StudyParams) {
  
    const studySession = await studyRepository.findStudySessionById(studySessionId); 
  
    if (studySession.userId !== userId){
      throw unauthorizedError();
    }
    const updatedStudySession = await studyRepository.updateStudySessionById(studySessionId, data);
    
    return updatedStudySession;
}

const studyService = {
  getStudySessionsByUserId,
  getStudySessionById,
  createStudySession,
  deleteStudySession,
  updateStudySession
};

export default studyService;