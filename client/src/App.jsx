import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrand from "./pages/ProductByBrand.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import HowToBuy from "./pages/HowToBuy.jsx";
import Contact from "./pages/Contact.jsx";
import Complain from "./pages/Complain.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import WishPage from "./pages/WishPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";

function ScrollToTopOnNavigation() {
    const {pathname} = useLocation()
    useEffect(() => {
        const scroll = () => {
          window.scrollTo(0,0)
        }
        requestAnimationFrame(scroll)
    }, [pathname]);
    return null
}

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTopOnNavigation/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/by-brand/:id" element={<ProductByBrand/>}/>
                    <Route path="/by-category/:id" element={<ProductByCategory/>}/>
                    <Route path="/by-keyword/:Keyword" element={<ProductByKeyword/>}/>
                    <Route path="/details/:productID" element={<ProductDetails/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/refund-policy" element={<RefundPolicy/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/how-to-buy" element={<HowToBuy/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/complian" element={<Complain/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/otp" element={<OtpPage/>}/>
                    <Route path="/wish" element={<WishPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/orders" element={<OrderPage/>}/>
                    <Route path="/invoice/:id" element={<InvoicePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;