const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all monuments
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT m.*, c.name AS city_name, r.name AS region_name 
      FROM monuments m 
      LEFT JOIN cities c ON m.city_id = c.id 
      LEFT JOIN regions r ON m.region_id = r.id
      WHERE m.name LIKE ? OR c.name LIKE ? OR r.name LIKE ?
    `;
    let countQuery = `
      SELECT COUNT(*) as total
      FROM monuments m
      LEFT JOIN cities c ON m.city_id = c.id
      LEFT JOIN regions r ON m.region_id = r.id
      WHERE m.name LIKE ? OR c.name LIKE ? OR r.name LIKE ?
    `;
    const searchParam = `%${search}%`;

    const [rows] = await db.query(query + ` LIMIT ? OFFSET ?`, [searchParam, searchParam, searchParam, limit, offset]);
    const [countResult] = await db.query(countQuery, [searchParam, searchParam, searchParam]);
    const totalCount = countResult[0].total;

    res.json({
      monuments: rows,
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monuments', error: error.toString() });
  }
});

// Get a single monument
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, c.name AS city_name, r.name AS region_name 
      FROM monuments m 
      LEFT JOIN cities c ON m.city_id = c.id 
      LEFT JOIN regions r ON m.region_id = r.id 
      WHERE m.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Monument not found' });
    } else {
      const monument = rows[0];
      try {
        monument.images = JSON.parse(monument.images || '[]');
      } catch (parseError) {
        monument.images = [];
      }
      res.json(monument);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monument', error: error.toString() });
  }
});



router.get('/city/:cityId', async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const [rows] = await db.query('SELECT * FROM monuments WHERE city_id = ?', [cityId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monuments', error: error.toString() });
  }
});

router.get('/region/:regionId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM monuments WHERE region_id = ?', [req.params.regionId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monuments for region', error: error.toString() });
  }
});

module.exports = router;