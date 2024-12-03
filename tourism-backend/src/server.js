const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const regionsRouter = require('./routes/regions');
const citiesRouter = require('./routes/cities');
const monumentsRouter = require('./routes/monuments');
const touristSitesRouter = require('./routes/touristSites');
const accommodationsRouter = require('./routes/accommodations');
const imagesRouter = require('./routes/images');
const path = require('path');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5002"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: 'http://localhost:3001', // or your frontend URL
  credentials: true,
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use express.json() for all routes except images
app.use(express.json());

app.use('/api/regions', regionsRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/monuments', monumentsRouter);
app.use('/api/tourist-sites', touristSitesRouter);
app.use('/api/accommodations', accommodationsRouter);
app.use('/api/images', imagesRouter);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));