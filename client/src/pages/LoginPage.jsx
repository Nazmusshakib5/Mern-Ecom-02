import React from 'react';
import LoginForm from "../components/users/LoginForm.jsx";
import AppLayout from "../components/layout/AppLayout.jsx";

const LoginPage = () => {
    return (
        <AppLayout>
            <LoginForm/>
        </AppLayout>
    );
};

export default LoginPage;