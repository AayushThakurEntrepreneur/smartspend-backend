const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Transaction = require('../models/transactionModel');

// ✅ Add transaction
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { name, amount, date, method, category, note, status } = req.body;

    const transaction = new Transaction({
      userId: req.user.userId,
      name,
      amount,
      date,
      method,
      category,
      note,
      status
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error adding transaction', error: err.message });
  }
});

// ✅ Get all transactions (main route used by frontend)
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
});

// ✅ (Optional) Get all transactions (legacy route if frontend ever used '/all')
router.get('/all', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
});

// ✅ Update transaction
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction', error: err.message });
  }
});

// 🗑 Delete transaction
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const result = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!result) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction', error: err.message });
  }
});

module.exports = router;
