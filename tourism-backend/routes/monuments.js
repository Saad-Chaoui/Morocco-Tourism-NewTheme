// In your GET monument by ID route
/*router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, 
             c.name AS city_name, 
             r.name AS region_name,
             GROUP_CONCAT(DISTINCT nc.id) as nearest_city_ids,
             GROUP_CONCAT(DISTINCT nc.name) as nearest_city_names
      FROM monuments m 
      LEFT JOIN cities c ON m.city_id = c.id 
      LEFT JOIN regions r ON m.region_id = r.id
      LEFT JOIN cities nc ON FIND_IN_SET(nc.name, m.nearest_cities)
      WHERE m.id = ?
      GROUP BY m.id
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Monument not found' });
    }

    const monument = rows[0];
    
    // Format nearest cities as array of objects with id and name
    try {
      monument.nearest_cities = monument.nearest_city_names ? 
        monument.nearest_city_names.split(',').map((name, index) => ({
          id: monument.nearest_city_ids.split(',')[index],
          name: name
        })) : [];
    } catch (e) {
      monument.nearest_cities = [];
    }

    res.json(monument);
  } catch (error) {
    console.error('Error fetching monument:', error);
    res.status(500).json({ message: 'Error fetching monument details' });
  }
});
*/