import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all mosques
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching all mosques');
    const mosques = await prisma.mosque.findMany({
      orderBy: { id: 'asc' }
    });
    console.log('Found mosques:', mosques);
    res.json(mosques);
  } catch (error) {
    console.error('Error fetching mosques:', error);
    res.status(500).json({ error: 'Error fetching mosques' });
  }
});

// Get mosque by id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const mosque = await prisma.mosque.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!mosque) {
      return res.status(404).json({ error: 'Mosque not found' });
    }
    res.json(mosque);
  } catch (error) {
    console.error('Error fetching mosque:', error);
    res.status(500).json({ error: 'Error fetching mosque' });
  }
});

// Create new mosque
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      phone,
      street,
      neighborhood,
      city,
      state,
      countryCode,
      latitude,
      longitude,
      searchPageUrl,
      hasWheelchairAccess,
      hasWomenSection,
      openingHours
    } = req.body;

    const mosque = await prisma.mosque.create({
      data: {
        title,
        phone,
        street,
        neighborhood,
        city,
        state,
        countryCode,
        latitude,
        longitude,
        searchPageUrl,
        hasWheelchairAccess,
        hasWomenSection,
        openingHours
      }
    });
    res.status(201).json(mosque);
  } catch (error) {
    console.error('Error creating mosque:', error);
    res.status(500).json({ error: 'Error creating mosque' });
  }
});

// Update mosque
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      phone,
      street,
      neighborhood,
      city,
      state,
      countryCode,
      latitude,
      longitude,
      searchPageUrl,
      hasWheelchairAccess,
      hasWomenSection,
      openingHours
    } = req.body;

    const mosque = await prisma.mosque.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        phone,
        street,
        neighborhood,
        city,
        state,
        countryCode,
        latitude,
        longitude,
        searchPageUrl,
        hasWheelchairAccess,
        hasWomenSection,
        openingHours
      }
    });
    res.json(mosque);
  } catch (error) {
    console.error('Error updating mosque:', error);
    res.status(500).json({ error: 'Error updating mosque' });
  }
});

// Delete mosque
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.mosque.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting mosque:', error);
    res.status(500).json({ error: 'Error deleting mosque' });
  }
});

export const mosqueRoutes = router;
