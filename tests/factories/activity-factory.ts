import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import dayjs from "dayjs";

export function createActivity(userId: number) {
  return prisma.activity.create({
    data: {
        name: faker.name.firstName(), 
        userId,
        daysArray: "[1,3]",
        startsAt: dayjs().toDate(), 
        endsAt: dayjs().add(1, "hours").toDate(), 
    }
  });
}

