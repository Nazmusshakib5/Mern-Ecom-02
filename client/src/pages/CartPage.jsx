import React from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import CartList from "../components/carts/CartList.jsx";
import Category from "../components/products/Category.jsx";

const CartPage = () => {
    return (
        <AppLayout>
            <CartList/>
            <Category/>
        </AppLayout>
    );
};

export default CartPage;