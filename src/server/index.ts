import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { locationRoutes } from './routes/location';
import { prayerRoutes } from './routes/prayer';
import { settingsRoutes } from './routes/settings';
import { mosqueRoutes } from './routes/mosque';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/locations', locationRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/mosques', mosqueRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
