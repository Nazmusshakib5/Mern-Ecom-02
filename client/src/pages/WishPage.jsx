import React from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import WishList from "../components/wish/WishList.jsx";
import Brand from "../components/products/Brand.jsx";

const WishPage = () => {
    return (
        <AppLayout>
            <WishList/>
            <Brand/>
        </AppLayout>
    );
};

export default WishPage;