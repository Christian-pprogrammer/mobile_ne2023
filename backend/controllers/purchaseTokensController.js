const PurchaseToken = require("../models/purchasedTokenModel");
const calculateRemainingDays = require("../utils/calculateRemainingDays");
const generateToken = require("../utils/generateToken");
const getNumDays = require("../utils/getNumDays");

exports.purchaseToken = async (req,res) => {
  try{
    const amount = req.body.amount;

    if(amount < 100) {
      return res.status(400).json({
        message: 'amount should be not be less than 100'
      })
    }
    if(amount % 100 != 0) {
      return res.status(400).json({
        message: 'Amount should be divisible by 100'
      })
    }

    if(amount > 182500) {
      return res.status(400).json({
        message: 'Amount higher than expected (182500)'
      })
    }

    const days = getNumDays(amount);

    const meterNumber = req.body.meterNumber;

    const token = generateToken();

    const newPurchaseToken = {
      amount: amount,
      meter_number: meterNumber,
      token: token,
      token_status: 'NEW',
      token_value_days: days
    }
    const created = await PurchaseToken.create(newPurchaseToken);
    console.log(`New token purchased ${created.token}`)
    res.status(200).json({
      message: 'purchased successffuly',
      created
    })
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}


exports.validateToken = async (req,res) => {
  try{
    const token = await PurchaseToken.findById(req.params.id);
    if(!token) {
      res.status(400).json({
        message: 'No purchase found'
      })
    }
    const remainingDays = calculateRemainingDays(token.purchased_date, token.token_value_days);
    res.status(200).json({
      days: remainingDays,
      boughtDays: token.token_value_days 
    })
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

exports.getTokensByMeter = async (req,res) => {
  try{
    const tokens = await PurchaseToken.find({
      meter_number: req.params.meterNumber
    })
    if(tokens.length == 0) {
      return res.status(400).json({
        message: 'did not purchase with this meter number'
      })
    }
    res.status(200).json({
      tokens
    })
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

exports.getAllTokens = async (req,res) => {
  try{
    const tokens = await PurchaseToken.find();
    res.status(200).json({
      tokens: tokens
    })
  }catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}