import { faker } from "@faker-js/faker";
import { prisma } from "@/config";

export function createSubject(userId: number) {
  return prisma.subject.create({
    data: {
        name: faker.name.firstName(), 
        userId,
        linkUrl: faker.internet.url()
    }
  });
}

