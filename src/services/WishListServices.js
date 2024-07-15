const WishModel = require("../models/WishModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const WishListService = async (req) => {
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
                "_id":0,
                "userID":0,
                "createdAt":0,
                "updatedAt":0,
                "product._id":0,
                "product.brandID":0,
                "product.categoryID":0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await WishModel.aggregate([
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
const saveWishListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert: true})
        return {status: "Success", message: "Successfully added data to the wish list"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const removeWishListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.deleteOne(reqBody)
        return {status: "Success", message: "removed successfully"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}

module.exports = {
    WishListService,
    saveWishListService,
    removeWishListService
}