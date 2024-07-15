const {
    CartListService,
    saveCartListService,
    updateCartListService,
    removeCartListService
} = require("../services/CartListServices");
exports.CartList = async (req, res) => {
    let result = await CartListService(req);
    return res.status(200).json(result)
}
exports.SaveCartList = async (req, res) => {
    let result = await saveCartListService(req);
    return res.status(200).json(result)
}
exports.UpdateCartList = async (req, res) => {
    let result = await updateCartListService(req);
    return res.status(200).json(result)
}
exports.RemoveCartList = async (req, res) => {
    let result = await removeCartListService(req);
    return res.status(200).json(result)
}