// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Root Test Route
app.get('/', (req, res) => {
  res.send('SmartSpend backend is running 🚀');
});

// ✅ Route Handlers
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes); // ✅ This is the key one!

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log('📡 Ready at: http://localhost:' + PORT);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
