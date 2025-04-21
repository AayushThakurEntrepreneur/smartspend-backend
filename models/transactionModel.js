const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Other'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  status: {
    type: String,
    enum: ['Success', 'Failed'],
    default: 'Success'
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
