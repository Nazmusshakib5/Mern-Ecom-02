import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import ProductList from "../components/products/ProductList.jsx";

const ProductByCategory = () => {
    const {ListByCategoryRequest} = ProductStore()
    const {id} = useParams()
    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id)
        })()
    }, [id]);
    return (
        <AppLayout>
            <ProductList/>
        </AppLayout>
    );
};

export default ProductByCategory;