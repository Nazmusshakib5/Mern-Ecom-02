const EmailSend = require("../utilities/EmailHelper");
const UserModel = require("../models/UserModel");
const {EncodeToken} = require("../utilities/TokenHelper");
const ProfileModel = require("../models/ProfileModel");


const userOTPService = async (req) => {
    try {
        let email = req.params.email;
        let code = Math.random().toString(36).substr(2, 2).toUpperCase() + Math.random().toString(36).substr(2, 2) + Math.random().toString(36).substr(2, 2);
        let EmailText = `Your Verification Code is= ${code}`
        let EmailSubject = 'Email Verification'
        await UserModel.updateOne({email: email}, {$set: {otp: code}}, {upsert: true})
        await EmailSend(email, EmailText, EmailSubject)
        return {status: "Success", message: "6 Digit OTP has been send"}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

const verifyOTPService = async (req) => {
    try {
        let email = req.params.email;
        let otp = req.params.otp;
        let total = await UserModel.find({email: email, otp: otp}).count("total");
        if (total === 1) {
            let user_id = await UserModel.find({email: email, otp: otp}).select("_id")
            let token = EncodeToken(email, user_id[0]["_id"].toString())
            await UserModel.updateOne({email: email}, {$set: {otp: "0"}})
            return {status: "Success", message: "Valid OTP", token: token}
        } else {
            return {status: "Fail", message: "Invalid OTP"}
        }
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

const saveProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id
        await ProfileModel.updateOne({userID: user_id}, {$set: reqBody}, {upsert: true})
        return {status: "Success", message: "Personal Information has been added successfully"}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const readProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let result = await ProfileModel.find({userID: user_id})
        return {status: "Success", data: result}
    } catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

module.exports = {
    userOTPService,
    verifyOTPService,
    saveProfileService,
    readProfileService
}