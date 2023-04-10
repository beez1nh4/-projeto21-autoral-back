import { notFoundError, unauthorizedError } from "@/errors";
import subjectRepository, { SubjectParams } from "@/repositories/subject-repository";

async function getSubjectsByUserId(userId: number) {

  const subjects = await subjectRepository.findSubjectsByUserId(userId);

  if (!subjects) {
    throw notFoundError();
  }
  return subjects;
}

async function getSubjectById(userId: number, subjectId: number) {

    const subject = await subjectRepository.findSubjectById(subjectId);
  
    if (!subject) {
      throw notFoundError();
    }

    if (subject.userId !== userId){
      throw unauthorizedError();
    }

    return subject;
}

async function createSubject(subjectData: SubjectParams) {

  const subject = await subjectRepository.createSubject(subjectData);

  return subject;
}

async function deleteSubject(userId: number, subjectId: number) {
  
  const subject = await subjectRepository.findSubjectById(subjectId); 

  if (subject.userId !== userId){
    throw unauthorizedError();
  }
  await subjectRepository.deleteSubjectById(subjectId);
  
  return subject;
}

const subjectService = {
  getSubjectsByUserId,
  getSubjectById,
  createSubject,
  deleteSubject
};

export default subjectService;
