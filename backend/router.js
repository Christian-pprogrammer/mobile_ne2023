const express = require('express');
const { purchaseToken, validateToken, getTokensByMeter, getAllTokens } = require('./controllers/purchaseTokensController');

const router = express.Router();

router.post('/purchase', purchaseToken);
router.get('/validate/:id', validateToken);
router.get('/check-tokens/:meterNumber', getTokensByMeter);
router.get('/tokens', getAllTokens);

module.exports = router;