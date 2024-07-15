const mongoose = require('mongoose');
const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ReviewModel = require("../models/ReviewModel");
const ObjectId = mongoose.Types.ObjectId
const BrandListService = async () => {
    try {
        let data = await BrandModel.find();
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const CategoryListService = async () => {
    try {
        let data = await CategoryModel.find();
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const SliderListService = async () => {
    try {
        let data = await ProductSliderModel.find();
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const ListByBrandService = async (req) => {
    try {
        let brandID = new ObjectId(req.params.brandID);
        let matchStage = {$match: {brandID: brandID}};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }

}
const ListByCategoryService = async (req) => {
    try {
        let categoryID = new ObjectId(req.params.categoryID);
        let matchStage = {$match: {categoryID: categoryID}};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const ListBySmilierService = async (req) => {
    try {
        let categoryID = new ObjectId(req.params.categoryID);
        let matchStage = {$match: {categoryID: categoryID}};
        let limitStage = {$limit: 20}
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            limitStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const ListByKeywordService = async (req) => {
    try {
        let searchRegex = {$regex: req.params.Keyword, $options: "i"};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let searchParams = [{title: searchRegex}, {shortDes: searchRegex},{"brand.brandName": searchRegex},{"category.categoryName": searchRegex}];
        let searchQuery = {$or: searchParams};
        let matchStage = {$match: searchQuery};


        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            matchStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}

    } catch (e) {

    }
}
const ListByRemarkService = async (req) => {
    try {
        let remark = req.params.remark;
        let matchStage = {$match: {remark: remark}};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}

const DetailsService = async (req) => {
    try {
        let productID = new ObjectId(req.params.productID);
        let matchStage = {$match: {_id: productID}};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };
        let joinWithDetailsStage = {
            $lookup: {
                from: "productdetails",
                localField: "_id",
                foreignField: "productID",
                as: "details"
            }
        };
        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let unWindDetailsStage = {$unwind: "$details"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            joinWithDetailsStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            unWindDetailsStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const ReviewListService = async (req) => {
    try {
        let productID = new ObjectId(req.params.productID);
        let matchStage = {$match: {productID: productID}};
        let joinWithProfileStage = {
            $lookup: {
                from: "profiles",
                localField: "userID",
                foreignField: "userID",
                as: "profile"
            }
        };

        let unWindProfileStage = {$unwind: "$profile"};
        let ProjectionStage = {
            $project: {
                "profile.cus_name": 1,
                "rating": 1,
                "des": 1
            }
        }
        let data = await ReviewModel.aggregate([
            matchStage,
            joinWithProfileStage,
            unWindProfileStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
const saveReviewListService = async (req) => {
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        await ReviewModel.create({
            productID:reqBody["productID"],
            userID:user_id,
            des:reqBody["des"],
            rating:reqBody["rating"],
        })
        return {status: "Success", message: "Thanks For Your Feedback"}
    }
    catch (e) {
        return {status: "Fail", message: e.toString()}
    }
}
const ListByFilterService = async (req) => {
    try {
       let matchCondition = {}
        if (req.body["categoryID"]){
            matchCondition.categoryID = new ObjectId(req.body["categoryID"]);
        }
        if (req.body["brandID"]){
            matchCondition.brandID = new ObjectId(req.body["brandID"]);
        }
        let matchStage = {$match: matchCondition};
        let AddFieldsStage = {
            $addFields:{numericPrice:{$toInt:"$price"}}
        }
        let priceMin = parseInt(req.body["priceMin"])
        let priceMax = parseInt(req.body["priceMax"])
        let priceMatchCondition = {}
        if (!isNaN(priceMin)){
            priceMatchCondition["numericPrice"] = {$gte: priceMin}
        }
        if (!isNaN(priceMax)){
            priceMatchCondition["numericPrice"] = {...( priceMatchCondition["numericPrice"] || {}), $lte: priceMax}
        }
        let PriceMatchStage = {$match: priceMatchCondition};
        let joinWithBrandsStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };
        let joinWithCategoriesStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };

        let unWindBrandsStage = {$unwind: "$brand"};
        let unWindCategoriesStage = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "categoryID": 0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            AddFieldsStage,
            PriceMatchStage,
            joinWithBrandsStage,
            joinWithCategoriesStage,
            unWindBrandsStage,
            unWindCategoriesStage,
            ProjectionStage
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}

module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    saveReviewListService,
    ListByFilterService
}
