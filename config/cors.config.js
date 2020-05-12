const cors = require('cors');

const corsMiddleware = cors([
  {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  allowedHeaders: ['Content-Type'],
  credentials: true
  },
  {
  origin: process.env.CORS_ORIGIN_2,
  allowedHeaders: ['Content-Type'],
  credentials: false
  }
])

module.exports = corsMiddleware;