import { getSession } from 'next-auth/react';
import prisma from '@/util/Prisma';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { Link } from '@prisma/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handle(req: NextApiRequest, res:NextApiResponse<Link[]>) {
  const { profile_id } = req.body

  const links = await prisma.link.findMany({
    where: {
      profile_id: profile_id
    }
  })

  res.json(links);
}