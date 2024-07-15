import React, {useEffect, useState} from 'react';
import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductSkeleton from "../../skeleton/ProductSkeleton.jsx";
import data from "bootstrap/js/src/dom/data.js";
import NoData from "../layout/NoData.jsx";

const ProductList = () => {
    const {
        ListProduct,
        BrandList,
        BrandListRequest,
        CategoryList,
        CategoryListRequest,
        ListByFilterRequest
    } = ProductStore()
    const [filter, setFilter] = useState({brandID: "", categoryID: "", priceMax: "", priceMin: ""})

    const filterOnChange = (name, value) => {
        setFilter((data) => ({
            ...data,
            [name]: value
        }))
    }

    useEffect(() => {
        (async () => {
            BrandList === null ? await BrandListRequest() : null;
            CategoryList === null ? await CategoryListRequest() : null;
            let isEveryFilterPropertyEmpty = Object.values(filter).every(value => value === "")
            !isEveryFilterPropertyEmpty ? await ListByFilterRequest(filter) : null
        })()
    }, [filter]);

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card side-navbarHei p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={filter.brandID} onChange={async (e) => {
                            await filterOnChange("brandID", e.target.value)
                        }} className="form-control form-select">
                            <option value="">Choose Brand</option>
                            {
                                BrandList !== null ? (
                                    BrandList.map((item, i) => {
                                        return (
                                            <option key={i} value={item["_id"]}>{item["brandName"]}</option>
                                        )
                                    })
                                ) : (
                                    <option></option>
                                )
                            }
                        </select>
                        <label className="form-label mt-3">Categories</label>
                        <select value={filter.categoryID} onChange={async (e) => {
                            await filterOnChange("categoryID", e.target.value)
                        }} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {
                                CategoryList !== null ? (
                                    CategoryList.map((item, i) => {
                                        return (
                                            <option key={i} value={item["_id"]}>{item["categoryName"]}</option>
                                        )
                                    })
                                ) : (
                                    <option></option>
                                )
                            }
                        </select>
                        <label className="form-label mt-3">Maximum Price ${filter.priceMax}</label>
                        <input value={filter.priceMax} onChange={async (e) => {
                            await filterOnChange("priceMax", e.target.value)
                        }} min={0} max={1000000} step={1000} type="range" className="form-range"/>


                        <label className="form-label mt-3">Minimum Price ${filter.priceMin}</label>
                        <input value={filter.priceMin} onChange={async (e) => {
                            await filterOnChange("priceMin", e.target.value)
                        }} min={0} max={1000000} step={1000} type="range" className="form-range"/>
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                            {
                                ListProduct === null ? (<ProductSkeleton/>) : (
                                    <div className="container">
                                        <div className="row">
                                            {
                                                ListProduct.length===0?(
                                                    <NoData text="No Product Available At This Moment"/>
                                                ):(
                                                    ListProduct.map((item, i) => {
                                                        let price = <p
                                                            className="bodyMedium text-dark my-1">${item["price"]} </p>
                                                        if (item["discount"] === true) {
                                                            price = <p
                                                                className="bodyMedium text-dark my-1">
                                                                $<strike>{item["price"]}</strike> {item["discountPrice"]}
                                                            </p>
                                                        }
                                                        return (
                                                            <div key={i}
                                                                 className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                                <Link to={`/details/${item["_id"]}`}
                                                                      className="card shadow-sm h-100 rounded-3 bg-white">
                                                                    <img className="w-100 rounded-top-2"
                                                                         src={item["image"]}/>
                                                                    <div className="card-body">
                                                                        <p className="bodySmal text-secondary my-1">{item["title"]}</p>
                                                                        {price}

                                                                        <StarRatings
                                                                            rating={parseFloat(item["star"])}
                                                                            starRatedColor="red"
                                                                            starDimension="15px"
                                                                            starSpacing="2px"/>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                )

                                            }

                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;