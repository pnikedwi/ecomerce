'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const result = await super.create(ctx);

        console.log('result', result);

        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            isProduction: true,
            serverKey: 'Mid-server-MH5CQzDWEdchdNYHn8KmMmAm',
            clientKey: 'Mid-client-X7AtSxW1eXZlGZSA'
        });

        let parameter = {
            "transaction_details": {
                "order_id": result.data.id,
                "gross_amount": result.data.attributes.totalPrice
            }, "credit_card": {
                "secure": true
            }
        };


        let response = await snap.createTransaction(parameter)

        //const midtransClient = require('midtrans-client');
        // Create Core API instance
        //let core = new midtransClient.CoreApi({
                //isProduction : true,
                //serverKey : 'Mid-server-MH5CQzDWEdchdNYHn8KmMmAm',
               // clientKey : 'Mid-client-X7AtSxW1eXZlGZSA'
            //});

        //let parameter = {
            //"payment_type": "gopay",
            //"transaction_details": {
              // "order_id": result.data.id,
                //"gross_amount": result.data.attributes.totalPrice
           // },
            //"credit_card":{
               // "token_id": 'CREDIT_CARD_TOKEN', // change with your card token
              //  "authentication": true
            //}
        //};

        // charge transaction
        //let response = await core.charge(parameter)
        return response;
    }
}));