import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = await prisma.settings.create({
        data: {
          method: 2,      // ISNA
          school: 0,      // Shafi
          midnightMode: 0 // Standard
        }
      });
      return res.json(defaultSettings);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching settings' });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const { method, school, midnightMode } = req.body;
    
    let settings = await prisma.settings.findFirst();
    
    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: { method, school, midnightMode }
      });
    } else {
      settings = await prisma.settings.create({
        data: { method, school, midnightMode }
      });
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error updating settings' });
  }
});

export const settingsRoutes = router;
