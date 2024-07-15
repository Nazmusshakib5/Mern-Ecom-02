import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import AppFooter from "./AppFooter.jsx";
import {Toaster} from "react-hot-toast";

const AppLayout = (props) => {
    return (
        <div>
            <AppNavbar/>
            {props.children}
            <Toaster
                position="top-center"
                // reverseOrder={false}
            />
            <AppFooter/>
        </div>
    );
};

export default AppLayout;