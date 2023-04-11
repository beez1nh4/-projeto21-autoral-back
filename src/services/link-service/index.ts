import { notFoundError, unauthorizedError } from "@/errors";
import linkRepository, { LinkParams } from "@/repositories/link-repository";

async function getLinksByUserId(userId: number) {

  const links = await linkRepository.findLinksByUserId(userId);

  if (!links) {
    throw notFoundError();
  }
  return links;
}

async function getLinkById(userId: number, linkId: number) {

    const link = await linkRepository.findLinkById(linkId);
  
    if (!linkId) {
      throw notFoundError();
    }

    if (link.userId !== userId){
      throw unauthorizedError();
    }

    return link;
}

async function createLink(linkData: LinkParams) {

  const link = await linkRepository.createLink(linkData);

  return link;
}

async function deleteLink(userId: number, linkId: number) {
  
  const link = await linkRepository.findLinkById(linkId); 

  if (link.userId !== userId){
    throw unauthorizedError();
  }
  await linkRepository.deleteLinkById(linkId);
  
  return link;
}

async function updateLink(userId: number, linkId: number, data: LinkParams) {
  
    const link = await linkRepository.findLinkById(linkId); 
  
    if (link.userId !== userId){
      throw unauthorizedError();
    }
    const updatedLink = await linkRepository.updateLinkById(linkId, data);
    
    return updatedLink;
}

const linkService = {
  getLinksByUserId,
  getLinkById,
  createLink,
  deleteLink,
  updateLink
};

export default linkService;
