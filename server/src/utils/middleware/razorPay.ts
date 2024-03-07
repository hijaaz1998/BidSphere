import Razorpay from 'razorpay';


let instance = new Razorpay
    ({
        key_id: 'rzp_test_fWH63GUDMTI221',
        key_secret: 'k0tmdvbtpmf11fcrrV5ay7dI'
    })

export const generareRazorpay = async (id: any, total: number) => {
    try {
        let options = {
            amount: total * 100,
            currency: 'INR',
        };

       const order = await instance.orders.create(options)       

       return {order, id}

    } catch (error) {
        console.log(error);
        
    }         
}


export const paymentVerify = (details: any) => {
    return new Promise((resolve, reject) => {
        const crypto = require('crypto');
        let hmac = crypto.createHmac('sha256', 'k0tmdvbtpmf11fcrrV5ay7dI')

        hmac.update(details.razorpayOrderId + '|' + details.razorpayPaymentId)
        hmac = hmac.digest('hex')

        if (hmac == details.razorpaySignature) {
            resolve(true);
        } else {
            reject(false);
        }
    })
}