import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const mosques = await prisma.mosque.findMany({
      where: {
        city: 'Dubai'
      },
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(mosques);
  } catch (error) {
    console.error('Error fetching mosques:', error);
    res.status(500).json({ message: 'Error fetching mosques' });
  }
}
