import React from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import InvoiceList from "../components/invoice/InvoiceList.jsx";

const OrderPage = () => {
    return (
        <AppLayout>
            <InvoiceList/>
        </AppLayout>
    );
};

export default OrderPage;