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
  res.send('Portfolio – Node.js, Express REST APIs & MongoDB is running 🚀');
});

// API routes
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server and connect DB
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });
