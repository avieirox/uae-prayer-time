import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listMosques() {
  try {
    const mosques = await prisma.mosque.findMany();
    console.log('Current mosques in database:');
    console.log(JSON.stringify(mosques, null, 2));
  } catch (error) {
    console.error('Error listing mosques:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listMosques();
