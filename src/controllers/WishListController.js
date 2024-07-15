const {saveWishListService, removeWishListService, WishListService} = require("../services/WishListServices");

exports.WishList = async (req, res) => {
    let result = await WishListService(req);
    return res.status(200).json(result)
}
exports.SaveWishList = async (req, res) => {
    let result = await saveWishListService(req);
    return res.status(200).json(result)
}
exports.RemoveWishList = async (req, res) => {
    let result = await removeWishListService(req);
    return res.status(200).json(result)
}