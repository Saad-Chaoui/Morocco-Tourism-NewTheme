const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all accommodations with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || '';
    const type = req.query.type || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT a.*, c.name as city_name, r.name as region_name,
      (SELECT url FROM accommodation_media WHERE accommodation_id = a.id AND is_primary = 1 LIMIT 1) as primary_image
      FROM accommodations a
      LEFT JOIN cities c ON a.city_id = c.id
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE (a.name LIKE ? OR c.name LIKE ? OR r.name LIKE ?)
    `;
    
    const params = [`%${search}%`, `%${search}%`, `%${search}%`];

    if (type) {
      query += ' AND a.type = ?';
      params.push(type);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);
    const [countResult] = await db.query(
      'SELECT COUNT(*) as total FROM accommodations WHERE name LIKE ?',
      [`%${search}%`]
    );

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      data: rows,
      currentPage: page,
      totalPages,
      totalItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations', error: error.toString() });
  }
});

// Add locations endpoint BEFORE the /:id route
router.get('/locations/all', async (req, res) => {
  try {
    const type = req.query.type || '';
    const search = req.query.search || '';

    let query = `
      SELECT a.id, a.name, a.type, a.latitude, a.longitude, 
             c.name as city_name, r.name as region_name,
             a.rating, a.price_range,
             (SELECT url FROM accommodation_media WHERE accommodation_id = a.id AND is_primary = 1 LIMIT 1) as primary_image
      FROM accommodations a
      LEFT JOIN cities c ON a.city_id = c.id
      LEFT JOIN regions r ON a.region_id = r.id
      WHERE a.latitude IS NOT NULL AND a.longitude IS NOT NULL
    `;
    
    const params = [];

    if (search) {
      query += ' AND (a.name LIKE ? OR c.name LIKE ? OR r.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (type) {
      query += ' AND a.type = ?';
      params.push(type);
    }
    
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching accommodation locations', 
      error: error.toString() 
    });
  }
});

// Get accommodation by ID route (and other existing routes)
router.get('/:id', async (req, res) => {
  try {
    const [accommodations] = await db.query(
      `SELECT a.*, c.name as city_name, r.name as region_name
       FROM accommodations a
       LEFT JOIN cities c ON a.city_id = c.id
       LEFT JOIN regions r ON a.region_id = r.id
       WHERE a.id = ?`,
      [req.params.id]
    );

    if (accommodations.length === 0) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    const accommodation = accommodations[0];
    let details = null;

    // Get type-specific details
    switch (accommodation.type.toLowerCase()) {
      case 'hotel':
        const [hotelDetails] = await db.query(
          'SELECT * FROM hotels WHERE accommodation_id = ?',
          [req.params.id]
        );
        details = hotelDetails[0] || null;
        break;
      case 'riad':
        const [riadDetails] = await db.query(
          'SELECT * FROM riads WHERE accommodation_id = ?',
          [req.params.id]
        );
        details = riadDetails[0] || null;
        break;
      case 'camping':
        const [campingDetails] = await db.query(
          'SELECT * FROM campings WHERE accommodation_id = ?',
          [req.params.id]
        );
        details = campingDetails[0] || null;
        break;
      case 'auberge':
        const [aubergeDetails] = await db.query(
          'SELECT * FROM auberges WHERE accommodation_id = ?',
          [req.params.id]
        );
        details = aubergeDetails[0] || null;
        break;
      case 'apartment':
      case 'villa':
        const [rentalDetails] = await db.query(
          'SELECT * FROM rental_properties WHERE accommodation_id = ?',
          [req.params.id]
        );
        details = rentalDetails[0] || null;
        break;
    }

    // Get media
    const [media] = await db.query(
      'SELECT * FROM accommodation_media WHERE accommodation_id = ?',
      [req.params.id]
    );

    res.json({
      ...accommodation,
      details,
      media
    });
  } catch (error) {
    console.error('Error in accommodation details:', error);
    res.status(500).json({ 
      message: 'Error fetching accommodation details',
      error: error.message 
    });
  }
});

// Get accommodations by city
router.get('/city/:cityId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, 
       (SELECT url FROM accommodation_media WHERE accommodation_id = a.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM accommodations a
       WHERE a.city_id = ?`,
      [req.params.cityId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations for city', error: error.toString() });
  }
});

// Get accommodations by region
router.get('/region/:regionId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, 
       (SELECT url FROM accommodation_media WHERE accommodation_id = a.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM accommodations a
       WHERE a.region_id = ?`,
      [req.params.regionId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations for region', error: error.toString() });
  }
});

// Get accommodations by type
router.get('/type/:type', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, 
       (SELECT url FROM accommodation_media WHERE accommodation_id = a.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM accommodations a
       WHERE a.type = ?`,
      [req.params.type]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations by type', error: error.toString() });
  }
});

module.exports = router;