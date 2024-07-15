const mongoose = require('mongoose');
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");
const FormData = require("form-data");
const axios = require("axios")
const ObjectId = mongoose.Types.ObjectId;
const createInvoiceService = async (req) => {

    // Calculate total payable price with vat

    let userID = new ObjectId(req.headers.user_id);
    let cus_email = req.headers.email;
    let matchStage = {$match: {userID: userID}};
    let joinWithProductsStage = {
        $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "product"
        }
    };
    let unWindProductsStage = {$unwind: "$product"};
    let CartProducts = await CartModel.aggregate([
        matchStage,
        joinWithProductsStage,
        unWindProductsStage
    ])

    let totalAmount = 0;
    CartProducts.forEach((element) => {
        let price;
        if (element["product"]["discount"]) {
            price = parseFloat(element["product"]["discountPrice"])
        } else {
            price = parseFloat(element["product"]["price"])
        }
        totalAmount += parseFloat(element["qty"]) * price
    })
    let vat = totalAmount * 0.05
    let payable = totalAmount + vat

    // Prepare Customer & Shipping Details

    let profile = await ProfileModel.aggregate([matchStage])

    let cus_details = `Name: ${profile[0]["cus_name"]}, Email: ${cus_email},
     Customer Address: ${profile[0]["cus_add"]},
      Customer Number: ${profile[0]["cus_phone"]}`
    let ship_details = `Name: ${profile[0]["ship_name"]}, 
    City: ${profile[0]["ship_city"]},
     Shipping Address: ${profile[0]["ship_add"]}, 
    Shipping Number: ${profile[0]["ship_phone"]}`

    // Transaction and validation Ids
    let tran_id = Math.floor(10000000 + Math.random() * 90000000);
    let val_id = 0;
    let delivery_status = "pending"
    let payment_status = "pending"


    // create Invoice

    let createInvoice = await InvoiceModel.create({
        userID: userID,
        payable: payable,
        cus_details: cus_details,
        ship_details: ship_details,
        tran_id: tran_id,
        val_id: val_id,
        payment_status: payment_status,
        delivery_status: delivery_status,
        total: totalAmount,
        vat: vat,
    })

    // Create InvoiceProduct

    let invoiceID = createInvoice["_id"]
    CartProducts.forEach(async (element) => {
        await InvoiceProductModel.create({
            userID: userID,
            productID: element["productID"],
            invoiceID: invoiceID,
            qty: element["qty"],
            price: element["product"]["discount"] ? element["product"]["discountPrice"] : element["product"]["price"],
            color: element["color"],
            size: element["size"]
        })
    })

    // Remove Cart

    await CartModel.deleteMany({userID: userID})

    // SSL Payment

    let paymentSetting = await PaymentSettingModel.find()
    const form = new FormData()
    form.append("store_id", paymentSetting[0]["store_id"])
    form.append("store_passwd", paymentSetting[0]["store_passwd"])
    form.append("total_amount", payable.toString())
    form.append("currency", paymentSetting[0]["currency"])
    form.append("tran_id", tran_id)

    form.append("success_url", `${paymentSetting[0]["success_url"]}/${tran_id}`)
    form.append("fail_url", `${paymentSetting[0]["fail_url"]}/${tran_id}`)
    form.append("cancel_url", `${paymentSetting[0]["cancel_url"]}/${tran_id}`)
    form.append("ipn_url", `${paymentSetting[0]["ipn_url"]}/${tran_id}`)

    form.append("cus_name", profile[0]["cus_name"])
    form.append("cus_email", cus_email)
    form.append("cus_add1", profile[0]["cus_add"])
    form.append("cus_add2", profile[0]["cus_add"])
    form.append("cus_city", profile[0]["cus_city"])
    form.append("cus_state", profile[0]["cus_state"])
    form.append("cus_postcode", profile[0]["cus_postcode"])
    form.append("cus_country", profile[0]["cus_country"])
    form.append("cus_phone", profile[0]["cus_phone"])
    form.append("cus_fax", profile[0]["cus_fax"])

    form.append("shipping_method", "YES")
    form.append("ship_name", profile[0]["ship_name"])
    form.append("ship_add1", profile[0]["ship_add"])
    form.append("ship_add1", profile[0]["ship_add"])
    form.append("ship_city", profile[0]["ship_city"])
    form.append("ship_state", profile[0]["ship_state"])
    form.append("ship_country", profile[0]["ship_country"])
    form.append("ship_postcode", profile[0]["ship_postcode"])

    form.append("product_name", "According To The Invoice")
    form.append("product_category", "According To The Invoice")
    form.append("product_profile", "According To The Invoice")
    form.append("product_amount", "According To The Invoice")

    let SSLRes = await axios.post(paymentSetting[0]["init_url"], form)

    return {
        status: "Success",
        data: SSLRes.data
    }
}
const paymentSuccessService = async (req) => {
    try {
        let tran_id = req.params.tran_id;
        await InvoiceModel.updateOne({tran_id: tran_id}, {payment_status: "Success"})
        return {status: "Success"}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const paymentFailService = async (req) => {
    try {
        let tran_id = req.params.tran_id;
        await InvoiceModel.updateOne({tran_id: tran_id}, {payment_status: "Fail"})
        return {status: "Fail"}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const paymentCancelService = async (req) => {
    try {
        let tran_id = req.params.tran_id;
        await InvoiceModel.updateOne({tran_id: tran_id}, {payment_status: "Cancel"})
        return {status: "Cancel"}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const paymentIPNService = async (req) => {
    try {
        let tran_id = req.params.tran_id;
        let status = req.body["status"]
        await InvoiceModel.updateOne({tran_id: tran_id}, {payment_status: status})
        return {status: status}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const invoiceListService = async (req) => {
    try {
        let userID = req.headers.user_id;
        let invoices = await InvoiceModel.find({userID: userID})
        return {status: "Success", data: invoices}
    } catch (e) {
        return {status: "Fail", message: e.toString()}

    }
}
const invoiceProductListService = async (req) => {
    try {
        let userID = new ObjectId(req.headers.user_id);
        let invoiceID = new ObjectId(req.params.invoiceID);
        let matchStage = {$match: {userID: userID,invoiceID:invoiceID}};
        let joinWithProductsStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product"
            }
        };
        let unWindProductsStage = {$unwind: "$product"};
        let invoiceProducts = await InvoiceProductModel.aggregate([
            matchStage,
            joinWithProductsStage,
            unWindProductsStage
        ])

        return {status: "Success",data:invoiceProducts}

    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

module.exports = {
    createInvoiceService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelService,
    paymentIPNService,
    invoiceListService,
    invoiceProductListService
}