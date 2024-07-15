import React, {useEffect} from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import SliderSkeleton from "../skeleton/SliderSkeleton.jsx";
import FeatureSkeleton from "../skeleton/FeatureSkeleton.jsx";
import CategorySkeleton from "../skeleton/CategorySkeleton.jsx";
import ProductSkeleton from "../skeleton/ProductSkeleton.jsx";
import BrandSkeleton from "../skeleton/BrandSkeleton.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
import Slider from "../components/products/Slider.jsx";
import Feature from "../components/features/Feature.jsx";
import Category from "../components/products/Category.jsx";
import Product from "../components/products/Product.jsx";
import Brand from "../components/products/Brand.jsx";

const HomePage = () => {
    const {SliderListRequest, CategoryListRequest, ListByRemarkRequest, BrandListRequest} = ProductStore()
    const {FeaturesListRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await SliderListRequest()
            await FeaturesListRequest()
            await CategoryListRequest()
            await ListByRemarkRequest("new")
            await BrandListRequest()
        })()
    }, []);
    return (
        <AppLayout>
            <Slider/>
            <Feature/>
            <Category/>
            <Product/>
            <Brand/>
        </AppLayout>
    );
};

export default HomePage;