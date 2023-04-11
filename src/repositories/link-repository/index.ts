import { prisma } from "@/config";
import { Link } from "@prisma/client";

async function findLinksByUserId(userId: number) {
  return prisma.link.findMany({
    where: {
      userId,
    }
  });
}

async function createLink(params: LinkParams) {
  return prisma.link.create({
    data: {
      ...params,
    }
  });
}

async function findLinkById(linkId: number) {
    return prisma.link.findFirst({
      where: {
        id: linkId,
      }
    });
}

async function deleteLinkById(linkId: number) {
    return prisma.link.delete({
      where: {
        id: linkId,
      }
    });
}

async function updateLinkById(linkId: number, data: LinkParams) {
    return prisma.link.update({
      where: {
        id: linkId,
      },
      data
    });
}

export type LinkParams = Omit<Link, "id" | "createdAt" | "updatedAt">

const linkRepository = {
  findLinksByUserId,
  createLink,
  findLinkById,
  deleteLinkById,
  updateLinkById
};

export default linkRepository;