import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get prayers for a specific location and date range
router.get('/', async (req, res) => {
  try {
    const { locationId, startDate, endDate } = req.query;
    
    const prayers = await prisma.prayer.findMany({
      where: {
        locationId: parseInt(locationId as string),
        date: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: endDate ? new Date(endDate as string) : undefined
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    res.json(prayers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching prayers' });
  }
});

// Create new prayer times
router.post('/', async (req, res) => {
  try {
    const { locationId, date, fajr, sunrise, dhuhr, asr, maghrib, isha } = req.body;
    
    const prayer = await prisma.prayer.create({
      data: {
        locationId: parseInt(locationId),
        date: new Date(date),
        fajr: new Date(fajr),
        sunrise: new Date(sunrise),
        dhuhr: new Date(dhuhr),
        asr: new Date(asr),
        maghrib: new Date(maghrib),
        isha: new Date(isha)
      }
    });
    
    res.status(201).json(prayer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating prayer times' });
  }
});

// Update prayer times
router.put('/:id', async (req, res) => {
  try {
    const { fajr, sunrise, dhuhr, asr, maghrib, isha } = req.body;
    
    const prayer = await prisma.prayer.update({
      where: { id: parseInt(req.params.id) },
      data: {
        fajr: new Date(fajr),
        sunrise: new Date(sunrise),
        dhuhr: new Date(dhuhr),
        asr: new Date(asr),
        maghrib: new Date(maghrib),
        isha: new Date(isha)
      }
    });
    
    res.json(prayer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating prayer times' });
  }
});

// Delete prayer times
router.delete('/:id', async (req, res) => {
  try {
    await prisma.prayer.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting prayer times' });
  }
});

export const prayerRoutes = router;
