import React, {useEffect} from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import Details from "../components/products/Details.jsx";
import Brand from "../components/products/Brand.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import DetailsSkeleton from "../skeleton/DetailsSkeleton.jsx";

const ProductDetails = () => {
    const {ProductDetailsRequest, ReviewListRequest, BrandList, BrandListRequest} = ProductStore()
    const {productID} = useParams()
    useEffect(() => {
        (async () => {
            await ProductDetailsRequest(productID)
            await ReviewListRequest(productID)
            BrandList === null ? await BrandListRequest() : null
        })()
    }, []);
    return (
        <AppLayout>
            <Details/>
            <Brand/>
        </AppLayout>
    );
};

export default ProductDetails;