const express = require('express');
const router = express.Router();
const axios = require('axios');
const sharp = require('sharp');

router.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    // Determine which referrer to use based on the URL
    let referrer = 'https://www.freepik.com/';
    if (url.includes('shutterstock.com')) {
      referrer = 'https://www.shutterstock.com/';
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': referrer,
        'Accept': 'image/*'
      }
    });


    const contentType = response.headers['content-type'];

    res.set('Content-Type', contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'no-cache');
    res.send(response.data);
  } catch (error) {
    if (error.response) {
    }
    res.status(500).send('Error fetching media');
  }
});

router.get('/optimize', async (req, res) => {
  const { url, width } = req.query;

  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/*'
      }
    });

    const optimizedImage = await sharp(response.data)
      .resize(parseInt(width) || 800)
      .jpeg({ quality: 80 })
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=31536000');
    res.send(optimizedImage);
  } catch (error) {
    res.status(500).send('Error optimizing image');
  }
});

module.exports = router;