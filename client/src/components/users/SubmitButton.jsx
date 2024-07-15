import React from 'react';
import UserStore from "../../store/UserStore.js";

const SubmitButton = (props) => {
    const {isSubmit} = UserStore()
    if (!isSubmit){
        return (
                <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
        );
    } else {
        return (
            <button disabled={true} className={props.className}>
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Processing...</button>
        );
    }

};

export default SubmitButton;