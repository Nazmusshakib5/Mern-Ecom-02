const {userOTPService, verifyOTPService, saveProfileService, readProfileService} = require("../services/UserServices");


exports.UserOTP = async (req, res) => {
    let result = await userOTPService(req);
    return res.status(200).json(result)
}
exports.VerifyLogin = async (req, res) => {
    let result = await verifyOTPService(req);
    if (result["status"] === "Success") {
        let cookieOptions = {
            expires: new Date(Date.now() + 480 * 60*60 * 1000),
            httponly: false
        }
        res.cookie("token",result["token"],cookieOptions)
        return res.status(200).json(result)
    }
    else{
        return res.status(200).json(result)
    }

}
exports.UserLogout = (req,res)=>{
    let cookieOptions = {
        expires: new Date(Date.now() - 480 * 60*60 * 1000),
        httponly: false
    }
    res.cookie("token","",cookieOptions)
    return res.status(200).json({status: "Success", message: "Logout Successfully"});
}
exports.CreateProfile = async (req, res) => {
    let result = await saveProfileService(req);
    return res.status(200).json(result)
}
exports.UpdateProfile = async (req, res) => {
    let result = await saveProfileService(req);
    return res.status(200).json(result)
}
exports.ReadProfile = async (req, res) => {
    let result = await readProfileService(req);
    return res.status(200).json(result)
}