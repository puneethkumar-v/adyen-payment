const axios = require("axios");

let doAdyenPayment = async (req, res, next)  => {
    console.log("req.body", req.body, req.headers);
    let bodyData = req.body;
	let referenceId = req.body.referenceId;
    let count = 0;

    let adyenBodyData = {
        merchantAccount: bodyData.merchantAccount,
        reference: referenceId,
        amount: {
            value: bodyData.value,
            currency: bodyData.currency
        },
        paymentMethod: {
            type: "scheme",
            encryptedCardNumber: "test_4111111111111111",
            encryptedExpiryMonth: "test_03",
            encryptedExpiryYear: "test_2030",
            encryptedSecurityCode: "test_737"
          },

        recurringProcessingModel: "Subscription",
        storePaymentMethod: "true",
        shopperReference:`shopperref${count++}`,
        returnUrl:"https://your-company.com"
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://checkout-test.adyen.com/v70/payments',
        headers: { 
          'x-api-key': req.headers["x-api-key"]
        },
        data : adyenBodyData
      };

	console.log('doAdyenPayment:adyenBodyData:config', adyenBodyData, config);

	try {
        let result = await axios.request(config);
        console.log("result", result.data);
        return res.status(200).json(result.data);
    } catch(err) {
        console.log("Error", err);
        return res.status(401).json(err);
    }
}

let createSession = function(params) {}

let doAdyenRenewal = async function(req, res, next) {
    console.log("req.body", req.body, req.headers);
    let bodyData = req.body;
	let referenceId = req.body.referenceId;

    let adyenBodyData = {
        merchantAccount: bodyData.merchantAccount,
        reference: referenceId,
        amount: {
            value: bodyData.value,
            currency: bodyData.currency
        },
        paymentMethod: {
            type: "scheme",
            encryptedCardNumber: "test_4111111111111111",
            encryptedExpiryMonth: "test_03",
            encryptedExpiryYear: "test_2030",
            encryptedSecurityCode: "test_737"
          },
        returnUrl: "CUSTOM vCHARGE RETURN URL",
        shopperInteraction: "Ecommerce",
        recurringProcessingModel: "Subscription",
        storePaymentMethod: true,
        shopperReference: bodyData.shopperReference
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://checkout-test.adyen.com/v70/payments',
        headers: { 
          'x-api-key': req.headers["x-api-key"]
        },
        data : adyenBodyData
      };

	console.log('doAdyenRenewal:adyenBodyData:config', adyenBodyData, config);

	try {
        let result = await axios.request(config);
        console.log("result", result.data);
        return res.status(200).json(result.data);
    } catch(err) {
        console.log("Error", err);
        return res.status(401).json(err);
    }
}

module.exports = {
    doAdyenPayment: doAdyenPayment,
    createSession: createSession,
    doAdyenRenewal: doAdyenRenewal
}