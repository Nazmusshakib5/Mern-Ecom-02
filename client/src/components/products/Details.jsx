import React, {useState} from 'react';
import ProductImages from "./ProductImages.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/DetailsSkeleton.jsx";
import parse from "html-react-parser"
import Reviews from "./Reviews.jsx";
import CartStore from "../../store/CartStore.js";
import toast from "react-hot-toast";
import WishStore from "../../store/WishStore.js";
import CartSubmitButton from "../carts/CartSubmitButton.jsx";
import WishSubmitButton from "../wish/WishSubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import {Link} from "react-router-dom";

const Details = () => {
    const [quantity, setQuantity] = useState(1)
    const {ProductDetails} = ProductStore()
    const {CartSaveRequest, CartForm, CartListRequest, CartFormOnChange} = CartStore()
    const {WishSaveRequest, WishListRequest} = WishStore()
    const {isLogin} = UserStore()
    const increaseQuantity = () => {
        setQuantity(quantity => quantity + 1)
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
        }

    }

    const AddCart = async (productID) => {
        if (isLogin()){
            if (CartForm.size.length>0 && CartForm.color.length>0){
                let res = await CartSaveRequest(CartForm, productID, quantity)
                if (res) {
                    toast.success("Cart Item Added")
                    await CartListRequest()
                }
            }
            else {
                if (CartForm.size.length>0){
                    toast.error("Please Select the Color Of The Product")
                }
                else {
                    toast.error("Please Select the Size Of The Product")
                }
            }

        }
        else {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href="/login"
        }

    }

    const AddWish = async (productID) => {
        if (isLogin()){
            let res = await WishSaveRequest(productID)
            if (res) {
                toast.success("Wish Item Added")
                await WishListRequest()
            }
        }
        else {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href="/login"
        }
    }

    if (ProductDetails === null) {
        return (
            <DetailsSkeleton/>
        )
    } else {
        return (
            <div>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-7 p-3">
                            <ProductImages/>
                        </div>
                        <div className="col-md-5 p-3">
                            <h4>{ProductDetails[0]["title"]}</h4>
                            <p className="text-muted bodySmal my-1">Category: {ProductDetails[0]["category"]["categoryName"]}</p>
                            <p className="text-muted bodySmal my-1">Brand: {ProductDetails[0]["brand"]["brandName"]}</p>
                            <p className="bodySmal mb-2 mt-1">{ProductDetails[0]["shortDes"]}</p>
                            {
                                ProductDetails[0]["discount"] ? (
                                    <span className="bodyXLarge"> Price:
                                      $<strike className="text-secondary">
                                          {ProductDetails[0]["price"]}
                                      </strike>
                                        {" "}{ProductDetails[0]["discountPrice"]}
                                  </span>
                                ) : (
                                    <span className="bodyXLarge">
                                        Price: ${ProductDetails[0]["price"]}
                                    </span>
                                )
                            }
                            <div className="row">
                                <div className="col-xs-12 col-md-4 p-2">
                                    <label className="bodySmal">Size</label>
                                    <select value={CartForm.size} onChange={(e) => {
                                        CartFormOnChange("size", e.target.value)
                                    }} className="form-control my-2 form-select">
                                        <option value="">Size</option>
                                        {
                                            ProductDetails[0]["details"]["size"].split(",").map((item, i) => {
                                                return (
                                                    <option key={i} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-xs-12 col-md-4 p-2">
                                    <label className="bodySmal">Color</label>
                                    <select value={CartForm.color} onChange={(e) => {
                                        CartFormOnChange("color", e.target.value)
                                    }} className="form-control my-2 form-select">
                                        <option value="">Color</option>
                                        {
                                            ProductDetails[0]["details"]["color"].split(",").map((item, i) => {
                                                return (
                                                    <option key={i} value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-xs-12 col-md-4 p-2">
                                    <label className="bodySmal">Quantity</label>
                                    <div className="input-group my-2">
                                        <button onClick={decreaseQuantity} className="btn btn-outline-secondary">-
                                        </button>
                                        <input value={quantity} type="text"
                                               className="form-control bg-light text-center" readOnly/>
                                        <button onClick={increaseQuantity} className="btn btn-outline-secondary">+
                                        </button>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-4 p-2">
                                    <CartSubmitButton onClick={async () => {
                                        await AddCart(ProductDetails[0]["_id"])
                                    }} className="btn w-100 btn-success" text="Add to Cart"/>
                                </div>
                                <div className="col-xs-12 col-md-4 p-2">
                                    <WishSubmitButton onClick={async ()=>{await AddWish(ProductDetails[0]["_id"])}} className="btn w-100 btn-success" text="Add to Wish"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab"
                                        data-bs-target="#Speci-tab-pane" type="button" role="tab"
                                        aria-controls="Speci-tab-pane" aria-selected="true">Specifications
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab"
                                        data-bs-target="#Review-tab-pane"
                                        type="button" role="tab" aria-controls="Review-tab-pane"
                                        aria-selected="false">Review
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                                 aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(ProductDetails[0]["details"]["des"])
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel"
                                 aria-labelledby="Review-tab"
                                 tabIndex="0">
                                <Reviews/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default Details;