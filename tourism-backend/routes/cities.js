/*const express = require('express');
const router = express.Router();
const db = require('../db');

// Specific routes first
router.get('/name/:cityName', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM cities WHERE name LIKE ?',
      [req.params.cityName]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching city by name:', error);
    res.status(500).json({ message: 'Error fetching city' });
  }
});

router.get('/region/:regionId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cities WHERE region_id = ?', [req.params.regionId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities for region', error: error.toString() });
  }
});

// Generic routes last
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, r.name as region_name 
      FROM cities c
      LEFT JOIN regions r ON c.region_id = r.id
      WHERE c.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching city', error: error.toString() });
  }
});

// Remove duplicate routes and keep only one version of each endpoint
*/