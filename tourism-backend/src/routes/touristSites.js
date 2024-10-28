const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tourist sites
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let query = `
      SELECT ts.*, r.name as region_name 
      FROM touristsites ts
      LEFT JOIN regions r ON ts.region_id = r.id
      WHERE ts.name LIKE ? OR r.name LIKE ?
    `;
    
    let countQuery = `
      SELECT COUNT(*) as total
      FROM touristsites ts
      LEFT JOIN regions r ON ts.region_id = r.id
      WHERE ts.name LIKE ? OR r.name LIKE ?
    `;

    const searchParam = `%${search}%`;
    
    // Get total count
    const [countResult] = await db.query(countQuery, [searchParam, searchParam]);
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated results
    const [rows] = await db.query(query + ` LIMIT ? OFFSET ?`, [searchParam, searchParam, limit, offset]);

    // Parse JSON strings in the results
    const data = rows.map(site => ({
      ...site,
      images: JSON.parse(site.images || '[]'),
      nearest_cities: JSON.parse(site.nearest_cities || '[]')
    }));

    res.json({
      data,
      currentPage: page,
      totalPages,
      totalItems,
      limit
    });
  } catch (error) {
    console.error('Error in GET /tourist-sites:', error);
    res.status(500).json({ 
      message: 'Error fetching tourist sites', 
      error: error.toString() 
    });
  }
});

// Get a specific tourist site
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM touristsites WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Tourist site not found' });
    } else {
      const site = rows[0];
      try {
        site.images = JSON.parse(site.images || '[]');
        // Parse nearest_cities as simple array of strings
        site.nearest_cities = JSON.parse(site.nearest_cities || '[]').map(city => 
          typeof city === 'string' ? city : city.name
        );
      } catch (parseError) {
        site.images = [];
        site.nearest_cities = [];
      }
      res.json(site);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tourist site', error: error.toString() });
  }
});

// Add this new route
router.get('/region/:regionId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM touristsites WHERE region_id = ?', [req.params.regionId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tourist sites for region', error: error.toString() });
  }
});

module.exports = router;
