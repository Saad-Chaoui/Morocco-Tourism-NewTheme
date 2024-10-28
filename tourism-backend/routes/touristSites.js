// In your GET tourist site by ID route
/*router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ts.*, 
             r.name as region_name,
             GROUP_CONCAT(DISTINCT c.id) as city_ids,
             GROUP_CONCAT(DISTINCT c.name) as city_names
      FROM touristsites ts
      LEFT JOIN regions r ON ts.region_id = r.id
      LEFT JOIN cities c ON JSON_CONTAINS(ts.nearest_cities, CONCAT('"', c.name, '"'))
      WHERE ts.id = ?
      GROUP BY ts.id
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tourist site not found' });
    }

    const site = rows[0];
    
    // Parse nearest cities
    try {
      const nearestCities = JSON.parse(site.nearest_cities || '[]');
      const cityIds = site.city_ids ? site.city_ids.split(',') : [];
      const cityNames = site.city_names ? site.city_names.split(',') : [];
      
      site.nearest_cities = nearestCities.map((cityName, index) => ({
        id: cityIds[index] || null,
        name: cityName
      }));
    } catch (e) {
      console.error('Error parsing nearest cities:', e);
      site.nearest_cities = [];
    }

    res.json(site);
  } catch (error) {
    console.error('Error fetching tourist site:', error);
    res.status(500).json({ message: 'Error fetching tourist site details' });
  }
});
*/