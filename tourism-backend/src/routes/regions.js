const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all regions
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM regions ORDER BY id ASC');
    res.json({
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching regions', error });
  }
});

// Get a specific region with its tourist sites
router.get('/:id', async (req, res) => {
  try {
    const [regionRows] = await db.query('SELECT * FROM regions WHERE id = ?', [req.params.id]);
    if (regionRows.length === 0) {
      return res.status(404).json({ message: 'Region not found' });
    }
    const region = regionRows[0];

    // Fetch tourist sites for this region
    const [touristSitesRows] = await db.query('SELECT * FROM touristsites WHERE region_id = ?', [req.params.id]);
    
    // Parse the images JSON string for each tourist site
    const touristSites = touristSitesRows.map(site => ({
      ...site,
      images: JSON.parse(site.images || '[]'),
      nearest_cities: JSON.parse(site.nearest_cities || '[]')
    }));

    res.json({
      ...region,
      touristSites
    });
  } catch (error) {
    console.error('Error fetching region details:', error);
    res.status(500).json({ message: 'Error fetching region details', error: error.toString() });
  }
});

module.exports = router;
