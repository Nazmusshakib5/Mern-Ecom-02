const CartModel = require("../models/CartModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CartListService = async (req) => {
    try {
        let userID = new ObjectId(req.headers.user_id);
        let matchStage = {$match: {userID: userID}};
        let joinWithProductsStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product"
            }
        };
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "product.brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "product.categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindProductsStage = {$unwind: "$product"};
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "createdAt":0,
                "updatedAt":0,
                "product._id":0,
                "product.brandID":0,
                "product.categoryID":0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await CartModel.aggregate([
            matchStage,
            joinWithProductsStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindProductsStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }

}
const saveCartListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.create(reqBody)
        return {status: "Success", message: "Successfully added data to the Cart list"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const updateCartListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID
        let reqBody = req.body;
        await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody})
        return {status: "Success", message: "Successfully Updated data"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const removeCartListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.deleteOne(reqBody)
        return {status: "Success", message: "removed successfully"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

module.exports = {
    CartListService,
    saveCartListService,
    updateCartListService,
    removeCartListService
}