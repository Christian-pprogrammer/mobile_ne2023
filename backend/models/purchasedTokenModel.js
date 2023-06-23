const mongoose = require('mongoose');
const purchasedTokenSchema = new mongoose.Schema({
  meter_number: {
    type: String,
    validate: {
      validator: function(value) {
        const numLength = String(value).length;
        return numLength === 6; // Change 4 to your desired fixed length
      },
      message: 'meter number should be 6 characters'
    }
  },
  token: {
    type: String,
  },
  token_status: {
    type: String,
    enum: ['USED', 'NEW', 'EXPIRED'],
    default: 'NEW'
  },
  token_value_days: {
    type: Number
  },
  purchased_date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number
  }
})

const PurchaseToken = mongoose.model("PurchasedToken", purchasedTokenSchema);

module.exports = PurchaseToken;