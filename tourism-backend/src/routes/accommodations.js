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

// Get accommodation by ID with specific details based on type
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

    // Get type-specific details
    let typeDetails = {};
    switch (accommodation.type) {
      case 'Hotel':
        const [hotelDetails] = await db.query('SELECT * FROM hotels WHERE accommodation_id = ?', [req.params.id]);
        typeDetails = hotelDetails[0];
        break;
      case 'Riad':
        const [riadDetails] = await db.query('SELECT * FROM riads WHERE accommodation_id = ?', [req.params.id]);
        typeDetails = riadDetails[0];
        break;
      // Add other cases for different types
    }

    // Get media
    const [media] = await db.query(
      'SELECT * FROM accommodation_media WHERE accommodation_id = ?',
      [req.params.id]
    );

    res.json({
      ...accommodation,
      details: typeDetails,
      media
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodation', error: error.toString() });
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