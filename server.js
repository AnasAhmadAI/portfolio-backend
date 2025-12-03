import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import { connectDB } from './server/config/db.js';
import contactsRouter from './server/routes/contacts.routes.js';
import usersRouter from './server/routes/users.routes.js';
import { notFound, errorHandler } from './server/middleware/error.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello from Node API! Backend is running successfully 🚀');
});

// API routes
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server with OPTIONAL DB connection
const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  // No DB configured – start API only (perfect for Render deployment)
  console.warn('⚠ No MONGODB_URI set. Starting server WITHOUT database connection.');
  app.listen(PORT, () => {
    console.log(`✅ Server running (no DB) on http://localhost:${PORT}`);
  });
} else {
  // Normal case: connect to MongoDB then start server
  connectDB(mongoUri)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Database connection failed:', err);
      console.warn('⚠ Starting server WITHOUT database due to connection failure.');
      app.listen(PORT, () => {
        console.log(
          `✅ Server running on http://localhost:${PORT} (DB connection failed — running without DB)`
        );
      });
    });
}
