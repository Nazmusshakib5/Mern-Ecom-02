import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import AppLayout from "../components/layout/AppLayout.jsx";
import LegalContent from "../components/features/LegalContent.jsx";

const Terms = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("terms")
        })()
    }, []);

    return (
        <AppLayout>
            <LegalContent/>
        </AppLayout>
    );
};

export default Terms;