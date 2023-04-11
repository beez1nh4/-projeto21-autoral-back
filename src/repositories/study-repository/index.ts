import { prisma } from "@/config";
import { StudySession } from "@prisma/client";

async function findStudySessionsByUserId(userId: number) {
  return prisma.studySession.findMany({
    where: {
      userId,
    }
  });
}

async function createStudySession(params: StudyParams) {
  return prisma.studySession.create({
    data: {
      ...params,
    }
  });
}

async function findStudySessionById(studySessionId: number) {
    return prisma.studySession.findFirst({
      where: {
        id: studySessionId,
      }
    });
}

async function deleteStudySessionById(studySessionId: number) {
    return prisma.studySession.delete({
      where: {
        id: studySessionId,
      }
    });
}

async function updateStudySessionById(studySessionId: number, data: StudyParams) {
    return prisma.studySession.update({
      where: {
        id: studySessionId,
      },
      data
    });
}

export type StudyParams = Omit<StudySession, "id" | "createdAt" | "updatedAt">

const studyRepository = {
  findStudySessionsByUserId,
  createStudySession,
  findStudySessionById,
  deleteStudySessionById,
  updateStudySessionById
};

export default studyRepository;