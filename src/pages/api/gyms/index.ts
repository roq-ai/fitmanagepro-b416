import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gymValidationSchema } from 'validationSchema/gyms';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGyms();
    case 'POST':
      return createGym();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGyms() {
    const data = await prisma.gym
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'gym'));
    return res.status(200).json(data);
  }

  async function createGym() {
    await gymValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.member?.length > 0) {
      const create_member = body.member;
      body.member = {
        create: create_member,
      };
    } else {
      delete body.member;
    }
    const data = await prisma.gym.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
