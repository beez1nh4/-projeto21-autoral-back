import { AuthenticatedRequest } from "@/middlewares";
import linkService from "@/services/link-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getLinksByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const links = await linkService.getLinksByUserId(userId);

    if (!links) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(links);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getLinkById(req: AuthenticatedRequest, res: Response) {
  try {
    const linkId = Number(req.params.linkId);
    const { userId } = req;

    if (!linkId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const link = await linkService.getLinkById(userId, linkId);

    if (!link) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(link);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postLink(req: AuthenticatedRequest, res: Response) {
  try {
    const linkData = req.body;

    if (!linkData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const link = await linkService.createLink(linkData);

    if (!link) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(link);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function deleteLinkById(req: AuthenticatedRequest, res: Response) {
  try {
    const linkId = Number(req.params.linkId);
    const { userId } = req;

    if (!linkId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const link = await linkService.deleteLink(userId, linkId);

    if (!link) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(link);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }


export async function updateLinkById(req: AuthenticatedRequest, res: Response) {
    try {
      const linkId = Number(req.params.linkId);
      const { userId } = req;
      const data = req.body;
  
      if (!linkId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
      const link = await linkService.updateLink(userId, linkId, data);
  
      if (!link) {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(link);
    } catch (error) {
      if (error.name === "UnauthorizedError") {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
