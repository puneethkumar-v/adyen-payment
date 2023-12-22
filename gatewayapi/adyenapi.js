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
            encryptedCardNumber: "test_4917610000000000",
            encryptedExpiryMonth: "test_03",
            encryptedExpiryYear: "test_2030",
            encryptedSecurityCode: "test_737"
          },
        // paymentMethod: {
        //     type: "Visa",
        //     encryptedCardNumber: "test_4917610000000000",
        //     encryptedExpiryMonth: "test_03",
        //     encryptedExpiryYear: "test_2030",
        //     encryptedSecurityCode: "test_737"
        //   },
        metadata: {
            "subscriberid": "dQBoApnFXYv0",
            "providerid": "orimedia"
        },
        mandate: {
          frequency: "daily",
        },

        recurringProcessingModel: "Subscription",
        storePaymentMethod: "true",
        shopperReference:`dQBoApnFXYv0`,
        returnUrl:"https://vcharge.mobiotics.com/"
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

let createPaymentInstrument = async(req, res, next) => {
    let axiosBodyData = {
        type: "card",
        issuingCountryCode: "NL",
        balanceAccountId: "BA3227C223222B5CTBLR8BWJB",
        status: "active",
        card: {
          formFactor: "physical",
          brand: "mc",
          brandVariant: "mcdebit",
          cardholderName: "Puneeth",
          authentication: {
             password: "CARDUSERPASSWORD$1",
             phone:
               {
                  number: "31611223344",
                  type: "Mobile"
               }
          },
          deliveryContact: {
            name: {
              firstName: "Sam",
              lastName: "Hopper"
            }
          }
        },
        description: "YOUR_DESCRIPTION"
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://balanceplatform-api-test.adyen.com/bcl/v2/paymentInstruments',
        headers: { 
          'x-api-key': req.headers["x-api-key"]
        },
        data : axiosBodyData
      };

      console.log('doAdyenPayment:adyenBodyData:config', axiosBodyData, config);

    try {
        let result = await axios.request(config);
        console.log("result", result.data);
        return res.status(200).json(result.data);
    } catch(err) {
        console.log("Error", err);
        return res.status(401).json(err);
    }
}

let createSession = async function(req, res, next) {
  try {
    // Unique ref for the transaction
    const orderRef = uuid();
    // Determine host (for setting returnUrl)
    const protocol = req.socket.encrypted? 'https' : 'http';
    const host = req.get('host');

    // Ideally the data passed here should be computed based on business logic
    const axiosBodyData = {
      amount: { currency: "EUR", value: 10000 }, // Value is 100€ in minor units
      countryCode: "NL",
      merchantAccount: "MobioticsITSolutionsPvtLtdECOM" ,// Required: your merchant account
      reference: orderRef, // Required: your Payment Reference
      // set lineItems required for some payment methods (ie Klarna)
      lineItems: [
        {quantity: 1, amountIncludingTax: 5000 , description: "Sunglasses"},
        {quantity: 1, amountIncludingTax: 5000 , description: "Headphones"}
      ] ,
      returnUrl: `${protocol}://${host}/api/handleShopperRedirect?orderRef=${orderRef}` // Required `returnUrl` param: Set redirect URL required for some payment methods
    };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://checkout-test.adyen.com/v71/sessions',
        headers: { 
          'x-api-key': req.headers["x-api-key"]
        },
        data : axiosBodyData
      };

        let result = await axios.request(config);
        console.log("result", result.data);
        res.status(200).json(result.data);
    res.json({ result, clientKey: "test_QWQF64RRTNATZI3YYZ7CTTTLRIWJYTRT" });
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.status(err.statusCode).json(err.message);
  }
}

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
        url: 'https://checkout-test.adyen.com/v70/payments/authorise3d',
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
    createPaymentInstrument: createPaymentInstrument,
    doAdyenRenewal: doAdyenRenewal
}       