import {create} from "zustand"
import axios from "axios";

const ProductStore = create((set) => ({
    BrandList: null,
    BrandListRequest: async () => {
        let res = await axios.get("/api/ProductBrandList")
        if (res.data["status"] === "Success") {
            set({BrandList: res.data["data"]})
        }
    },
    CategoryList: null,
    CategoryListRequest: async () => {
        let res = await axios.get("/api/ProductCategoryList")
        if (res.data["status"] === "Success") {
            set({CategoryList: res.data["data"]})
        }
    },
    SliderList: null,
    SliderListRequest: async () => {
        let res = await axios.get("/api/ProductSliderList")
        if (res.data["status"] === "Success") {
            set({SliderList: res.data["data"]})
        }
    },
    ListByRemark: null,
    ListByRemarkRequest: async (remark) => {
        set({ListByRemark: null})
        let res = await axios.get(`/api/ProductListByRemark/${remark}`)
        if (res.data["status"] === "Success") {
            set({ListByRemark: res.data["data"]})
        }
    },

    ListProduct: null,
    ListByBrandRequest: async (brandID) => {
        set({ListProduct: null})
        let res = await axios.get(`/api/ProductListByBrand/${brandID}`)
        if (res.data["status"] === "Success") {
            set({ListProduct: res.data["data"]})
        }
    },
    ListByCategoryRequest: async (categoryID) => {
        set({ListProduct: null})
        let res = await axios.get(`/api/ProductListByCategory/${categoryID}`)
        if (res.data["status"] === "Success") {
            set({ListProduct: res.data["data"]})
        }
    },
    ListByFilterRequest: async (PostBody) => {
        set({ListProduct: null})
        let res = await axios.post(`/api/ProductListByFilter`,PostBody)
        if (res.data["status"] === "Success") {
            set({ListProduct: res.data["data"]})
        }
    },
    SearchKeyword: "",
    setSearchKeyword: async (Keyword) => {
        set({SearchKeyword: Keyword})
    },

    ListByKeywordRequest: async (SearchKeyword) => {
        set({ListProduct: null})
        let res = await axios.get(`/api/ProductListByKeyword/${SearchKeyword}`)
        if (res.data["status"] === "Success") {
            set({ListProduct: res.data["data"]})
        }
    },
    ProductDetails: null,
    ProductDetailsRequest: async (productID) => {
        set({ProductDetails: null})
        let res = await axios.get(`/api/ProductDetails/${productID}`)
        if (res.data["status"] === "Success") {
            set({ProductDetails: res.data["data"]})
        }
    },
    ReviewList: null,
    ReviewListRequest: async (productID) => {
        set({ReviewList: null})
        let res = await axios.get(`/api/ProductReviewList/${productID}`)
        if (res.data["status"] === "Success") {
            set({ReviewList: res.data["data"]})
        }
    },
}))
export default ProductStore