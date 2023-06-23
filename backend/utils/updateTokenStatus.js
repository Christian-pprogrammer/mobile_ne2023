const PurchasedToken = require('../models/purchasedTokenModel');
const calculateRemainingDays = require('./calculateRemainingDays');

async function updateTokenStatus() {
  try{
    const allItems = await PurchasedToken.find();
    const expiredItems = allItems.filter((item)=>{
      if((calculateRemainingDays(item.purchased_date, item.token_value_days) <= 0)) {
        return true;
      }else{
        return false;
      }
    })
    console.log(expiredItems);
    const updateResult = await PurchasedToken.updateMany(
      { _id: { $in: expiredItems.map(item => item._id) } },
      { $set: { status: 'EXPIRED' } }
    );
  }catch(err) {
    console.log(err);
  }
}

module.exports = updateTokenStatus;