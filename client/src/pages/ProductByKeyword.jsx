import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import ProductList from "../components/products/ProductList.jsx";

const ProductByKeyword = () => {
    const {ListByKeywordRequest} = ProductStore()
    const {Keyword} = useParams()
    useEffect(() => {
        (async ()=>{
            await ListByKeywordRequest(Keyword)
        })()
    }, [Keyword]);
    return (
        <AppLayout>
            <ProductList/>
        </AppLayout>
    );
};

export default ProductByKeyword;