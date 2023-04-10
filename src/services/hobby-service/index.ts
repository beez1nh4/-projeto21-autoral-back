import { notFoundError, unauthorizedError } from "@/errors";
import hobbyRepository, { HobbyParams } from "@/repositories/hobby-repository";
import { HobbyStatus } from "@prisma/client";

async function getHobbiesByUserId(userId: number) {

  const hobbies = await hobbyRepository.findHobbiesByUserId(userId);

  if (!hobbies) {
    throw notFoundError();
  }
  return hobbies;
}

async function getHobbyById(userId: number, hobbyId: number) {

    const hobby = await hobbyRepository.findHobbyById(hobbyId);
  
    if (!hobbyId) {
      throw notFoundError();
    }

    if (hobby.userId !== userId){
      throw unauthorizedError();
    }

    return hobby;
}

async function createHobby(hobbyData: HobbyParams) {

  const hobby = await hobbyRepository.createHobby(hobbyData);

  return hobby;
}

async function deleteHobby(userId: number, hobbyId: number) {
  
  const hobby = await hobbyRepository.findHobbyById(hobbyId); 

  if (hobby.userId !== userId){
    throw unauthorizedError();
  }
  await hobbyRepository.deleteHobbyById(hobbyId);
  
  return hobby;
}

async function updateHobby(userId: number, hobbyId: number, status: HobbyStatus) {
  
    const hobby = await hobbyRepository.findHobbyById(hobbyId); 
  
    if (hobby.userId !== userId){
      throw unauthorizedError();
    }
    const updatedHobby = await hobbyRepository.updateHobbyById(hobbyId, status);
    
    return updatedHobby;
}

const hobbyService = {
  getHobbiesByUserId,
  getHobbyById,
  createHobby,
  deleteHobby,
  updateHobby
};

export default hobbyService;
