const express = require("express");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const router = express.Router();
const AuthVerification = require("../Middlewares/AuthVerification")
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const InvoiceController = require("../controllers/InvoiceController");
const FeaturesController = require("../controllers/FeaturesController");

// Product
router.get("/ProductBrandList", ProductController.ProductBrandList)
router.get("/ProductCategoryList", ProductController.ProductCategoryList)
router.get("/ProductSliderList", ProductController.ProductSliderList)
router.get("/ProductListByBrand/:brandID", ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:categoryID", ProductController.ProductListByCategory)
router.get("/ProductListBySmilier/:categoryID", ProductController.ProductListBySmilier)
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword)
router.get("/ProductListByRemark/:remark", ProductController.ProductListByRemark)
router.get("/ProductDetails/:productID", ProductController.ProductDetails)
router.post("/ProductListByFilter", ProductController.ProductListByFilter)

// user

router.get("/UserOTP/:email", UserController.UserOTP)
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin)
router.get("/UserLogout", AuthVerification, UserController.UserLogout)
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile)
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile)
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile)

// Reviews

router.get("/ProductReviewList/:productID", ProductController.ProductReviewList)
router.post("/CreateReview", AuthVerification, ProductController.CreateReview)

// wishList

router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList)
router.post("/RemoveWishList", AuthVerification, WishListController.RemoveWishList)
router.get("/WishList", AuthVerification, WishListController.WishList)// wishList

// cartList

router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList)
router.post("/UpdateCartList/:cartID", AuthVerification, CartListController.UpdateCartList)
router.post("/RemoveCartList", AuthVerification, CartListController.RemoveCartList)
router.get("/CartList", AuthVerification, CartListController.CartList)

// Features

router.get("/FeaturesList", FeaturesController.FeaturesList)
router.get("/LegalDetails/:type", FeaturesController.LegalDetails)

//invoice

router.get("/CreateInvioce", AuthVerification, InvoiceController.CreateInvioce)
router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:invoiceID", AuthVerification, InvoiceController.InvoiceProductList)

// payment
router.post("/PaymentSuccess/:tran_id",  InvoiceController.PaymentSuccess)
router.post("/PaymentFail/:tran_id",  InvoiceController.PaymentFail)
router.post("/PaymentCancel/:tran_id",  InvoiceController.PaymentCancel)
router.post("/PaymentIPN/:tran_id",  InvoiceController.PaymentIPN)

module.exports = router;