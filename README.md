# Adyen Payment Testing

## Curl request example:
```js
curl --location 'http://localhost:5000/v1/payment' \
--header 'x-api-key: YOUR-X-API-KEY' \
--header 'Content-Type: application/json' \
--data '{
    "merchantAccount": "YOUR MERCHANT ACCOUNT",
    "value" : 1,
    "currency" : "INR",
    "referenceId": "uniqueref2"
}'
```

## Tasks:
- [x] POST api
  - Create Payment
    - Merchant Account
    - Currency
    - Amount
    - Reference ID
- [x] POST API
  - Renewal

## Reference:

- [x] [Adyen Official Docs](https://docs.adyen.com/)


