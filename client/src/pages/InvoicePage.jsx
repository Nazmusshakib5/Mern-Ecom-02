import React from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import InvoiceDetails from "../components/invoice/InvoiceDetails.jsx";

const InvoicePage = () => {
    return (
        <AppLayout>
            <InvoiceDetails/>
        </AppLayout>
    );
};

export default InvoicePage;