import React, {useEffect} from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import LegalContent from "../components/features/LegalContent.jsx";
import FeatureStore from "../store/FeatureStore.js";

const About = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("about")
        })()
    }, []);

    return (
        <AppLayout>
            <LegalContent/>
        </AppLayout>
    );
};

export default About;