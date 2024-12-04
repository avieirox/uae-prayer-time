import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching locations' });
  }
});

// Get location by id
router.get('/:id', async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { prayers: true }
    });
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location' });
  }
});

// Create new location
router.post('/', async (req, res) => {
  try {
    const { city, country, latitude, longitude, timezone } = req.body;
    const location = await prisma.location.create({
      data: {
        city,
        country,
        latitude,
        longitude,
        timezone
      }
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error creating location' });
  }
});

// Update location
router.put('/:id', async (req, res) => {
  try {
    const { city, country, latitude, longitude, timezone } = req.body;
    const location = await prisma.location.update({
      where: { id: parseInt(req.params.id) },
      data: {
        city,
        country,
        latitude,
        longitude,
        timezone
      }
    });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Error updating location' });
  }
});

// Delete location
router.delete('/:id', async (req, res) => {
  try {
    await prisma.location.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting location' });
  }
});

// Mosque routes
router.get('/mosques', async (req, res) => {
  try {
    const mosques = await prisma.mosque.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(mosques);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mosques' });
  }
});

router.post('/mosques', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const mosque = await prisma.mosque.create({
      data: {
        name,
        address,
        latitude,
        longitude
      }
    });
    res.status(201).json(mosque);
  } catch (error) {
    res.status(500).json({ error: 'Error creating mosque' });
  }
});

router.put('/mosques/:id', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const mosque = await prisma.mosque.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        address,
        latitude,
        longitude
      }
    });
    res.json(mosque);
  } catch (error) {
    res.status(500).json({ error: 'Error updating mosque' });
  }
});

router.delete('/mosques/:id', async (req, res) => {
  try {
    await prisma.mosque.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting mosque' });
  }
});

export const locationRoutes = router;
