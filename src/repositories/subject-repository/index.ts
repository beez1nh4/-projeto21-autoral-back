import { prisma } from "@/config";
import { Subject } from "@prisma/client";

async function findSubjectsByUserId(userId: number) {
  return prisma.subject.findMany({
    where: {
      userId,
    }
  });
}

async function createSubject(params: SubjectParams) {
  return prisma.subject.create({
    data: {
      ...params,
    }
  });
}

async function findSubjectById(subjectId: number) {
    return prisma.subject.findFirst({
      where: {
        id: subjectId,
      }
    });
}

async function deleteSubjectById(subjectId: number) {
    return prisma.subject.delete({
      where: {
        id: subjectId,
      }
    });
}

export type SubjectParams = Omit<Subject, "id" | "createdAt" | "updatedAt">

const subjectRepository = {
  findSubjectsByUserId,
  createSubject,
  findSubjectById,
  deleteSubjectById
};

export default subjectRepository;
