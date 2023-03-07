import { getSession } from 'next-auth/react';
import prisma from '@/util/Prisma';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { Profile } from '@prisma/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handle(req: NextApiRequest, res:NextApiResponse<Profile[] | number>) {
  const session = await getSession({ req });

  if (!session) {
    return res.json(201)
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user!.email!
    }
  })

  const result = await prisma.profile.findMany({
    where: {
      user_id: user.id
    }
  })
  res.json(result);
}