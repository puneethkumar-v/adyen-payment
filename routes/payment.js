const express = require('express');
const router = express.Router();

let adyenapi = require('../gatewayapi/adyenapi');
router.post('/v1/payment', adyenapi.doAdyenPayment);

router.post('/v1/session', adyenapi.createSession);

router.post('/v1/paymentInstruments', adyenapi.createPaymentInstrument);

router.post('/v1/renewal', adyenapi.doAdyenRenewal);

module.exports = router;