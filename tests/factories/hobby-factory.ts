import { faker } from "@faker-js/faker";
import { prisma } from "@/config";

export function createHobby(userId: number) {
  return prisma.hobby.create({
    data: {
        name: faker.name.firstName(), 
        userId,
        status: "NEW"
    }
  });
}

