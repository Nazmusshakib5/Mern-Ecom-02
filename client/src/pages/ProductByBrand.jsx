import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import ProductList from "../components/products/ProductList.jsx";
import AppLayout from "../components/layout/AppLayout.jsx";

const ProductByBrand = () => {
    const {ListByBrandRequest} = ProductStore()
    const {id} = useParams()
    useEffect(() => {
        (async ()=>{
            await ListByBrandRequest(id)
        })()
    }, [id]);
    return (
        <AppLayout>
            <ProductList/>
        </AppLayout>
    );
};

export default ProductByBrand;