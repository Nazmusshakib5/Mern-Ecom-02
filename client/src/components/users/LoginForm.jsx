import React, {useState} from 'react';
import SubmitButton from "./SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import validationHelper from "../../utility/validationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate()
    const {EmailFormData, EmailDataOnChange,UserOtpRequest} = UserStore()
    const onFormSubmit =async ()=>{
        if (!validationHelper.IsEmail(EmailFormData.email)){
            toast.error('Valid Email Address Required!',
                {
                    // icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
        else {
            let result = await UserOtpRequest(EmailFormData.email);
            result ? navigate("/otp"):(
                toast.error('Valid Email Address Required!',
                    {
                        // icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            )
        }
    }
    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input value={EmailFormData.email} onChange={(e) => EmailDataOnChange("email", e.target.value)}
                               placeholder="Email Address" type="email" className="form-control"/>
                        <SubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;