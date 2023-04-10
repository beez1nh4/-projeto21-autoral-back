import { prisma } from "@/config";
import { Hobby, HobbyStatus } from "@prisma/client";

async function findHobbiesByUserId(userId: number) {
  return prisma.hobby.findMany({
    where: {
      userId,
    }
  });
}

async function createHobby(params: HobbyParams) {
  return prisma.hobby.create({
    data: {
      ...params,
    }
  });
}

async function findHobbyById(hobbyId: number) {
    return prisma.hobby.findFirst({
      where: {
        id: hobbyId,
      }
    });
}

async function deleteHobbyById(hobbyId: number) {
    return prisma.hobby.delete({
      where: {
        id: hobbyId,
      }
    });
}

async function updateHobbyById(hobbyId: number, status: HobbyStatus) {
    return prisma.hobby.update({
      where: {
        id: hobbyId,
      },
      data:{
        status
      }
    });
}

export type HobbyParams = Omit<Hobby, "id" | "createdAt" | "updatedAt">

const hobbyRepository = {
  findHobbiesByUserId,
  createHobby,
  findHobbyById,
  deleteHobbyById,
  updateHobbyById
};

export default hobbyRepository;
