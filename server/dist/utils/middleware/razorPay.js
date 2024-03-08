"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerify = exports.generareRazorpay = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
let instance = new razorpay_1.default({
    key_id: 'rzp_test_fWH63GUDMTI221',
    key_secret: 'k0tmdvbtpmf11fcrrV5ay7dI'
});
const generareRazorpay = async (id, total) => {
    try {
        let options = {
            amount: total * 100,
            currency: 'INR',
        };
        const order = await instance.orders.create(options);
        return { order, id };
    }
    catch (error) {
        console.log(error);
    }
};
exports.generareRazorpay = generareRazorpay;
const paymentVerify = (details) => {
    return new Promise((resolve, reject) => {
        const crypto = require('crypto');
        let hmac = crypto.createHmac('sha256', 'k0tmdvbtpmf11fcrrV5ay7dI');
        hmac.update(details.razorpayOrderId + '|' + details.razorpayPaymentId);
        hmac = hmac.digest('hex');
        if (hmac == details.razorpaySignature) {
            resolve(true);
        }
        else {
            reject(false);
        }
    });
};
exports.paymentVerify = paymentVerify;
