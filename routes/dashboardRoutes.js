const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// GET /api/dashboard
router.get('/', verifyToken, (req, res) => {
  res.json({
    message: `Welcome, user ID: ${req.user.userId}`,
    tips: [
      'Track your expenses daily',
      'Set monthly limits',
      'Review categories frequently'
    ]
  });
});

module.exports = router;
