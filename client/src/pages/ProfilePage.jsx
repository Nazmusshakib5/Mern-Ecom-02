import React from 'react';
import AppLayout from "../components/layout/AppLayout.jsx";
import ProfileForm from "../components/users/ProfileForm.jsx";

const ProfilePage = () => {
    return (
        <AppLayout>
            <ProfileForm/>
        </AppLayout>
    );
};

export default ProfilePage;