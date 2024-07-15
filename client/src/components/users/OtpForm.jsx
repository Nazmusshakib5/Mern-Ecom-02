import React from 'react';
import SubmitButton from "./SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import validationHelper from "../../utility/validationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OtpForm = () => {
    let navigate = useNavigate()
    const {OtpFormData, OtpDataOnChange,VerifyLoginRequest} = UserStore()
    const onFormSubmit =async ()=>{
        if (validationHelper.IsEmpty(OtpFormData.otp)){
            toast.error('Valid PIN Required!',
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
            let result = await VerifyLoginRequest(OtpFormData.otp);
            result ? navigate("/"):(
                toast.error('Valid PIN Required!',
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
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input value={OtpFormData.otp} onChange={(e) => OtpDataOnChange("otp", e.target.value)} placeholder="Verification" type="text" className="form-control"/>
                        <SubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;