const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all cities
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT c.*, r.name AS region_name 
      FROM cities c
      LEFT JOIN regions r ON c.region_id = r.id
      WHERE c.name LIKE ? OR r.name LIKE ?
      LIMIT ? OFFSET ?
    `;
    
    const countQuery = `
      SELECT COUNT(*) as total
      FROM cities c
      LEFT JOIN regions r ON c.region_id = r.id
      WHERE c.name LIKE ? OR r.name LIKE ?
    `;

    const [rows] = await db.query(query, [`%${search}%`, `%${search}%`, limit, offset]);
    const [countResult] = await db.query(countQuery, [`%${search}%`, `%${search}%`]);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      cities: rows,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Error fetching cities', error: error.toString() });
  }
});

// Get a single city
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cities WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'City not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching city', error });
  }
});

// Add this new route
router.get('/search/:name', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cities WHERE name LIKE ?', [`%${req.params.name}%`]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'City not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching for city', error });
  }
});

// Add this new route
router.get('/region/:regionId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cities WHERE region_id = ?', [req.params.regionId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities for region', error: error.toString() });
  }
});

module.exports = router;
