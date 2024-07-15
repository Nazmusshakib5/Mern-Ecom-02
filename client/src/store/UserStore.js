import {create} from "zustand"
import axios from "axios";
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";

const UserStore = create((set) => ({
    isLogin: () => {
        return !!Cookies.get("token")
    },
    EmailFormData: {email: ""},
    EmailDataOnChange: (name, value) => {
        set((state) => ({
            EmailFormData: {
                ...state.EmailFormData,
                [name]: value
            }
        }))
    },
    OtpFormData: {otp: ""},
    OtpDataOnChange: (name, value) => {
        set((state) => ({
            OtpFormData: {
                ...state.OtpFormData,
                [name]: value
            }
        }))
    },


    isSubmit: false,
    UserOtpRequest: async (email) => {
        set({isSubmit: true})
        let res = await axios.get(`/api/UserOTP/${email}`)
        setEmail(email)
        set({isSubmit: false})
        return res.data["status"] === "Success";
    },
    // LegalDetails:null,
    VerifyLoginRequest: async (otp) => {
        set({isSubmit: true})
        let email = getEmail()
        let res = await axios.get(`/api/VerifyLogin/${email}/${otp}`)
        set({isSubmit: false})
        return res.data["status"] === "Success";
    },
    UserLogoutRequest: async () => {
        // set({isSubmit: true})
        let res = await axios.get(`/api/UserLogout`)
        // set({isSubmit: false})
        return res.data["status"] === "Success";
    },

    ProfileForm: {
        cus_add: "",
        cus_city: "",
        cus_country: "",
        cus_fax: "",
        cus_name: "",
        cus_phone: "",
        cus_postcode: "",
        cus_state: "",
        ship_add: "",
        ship_city: "",
        ship_country: "",
        ship_name: "",
        ship_phone: "",
        ship_postcode: "",
        ship_state: ""
    },
    ProfileFormChange: (name, value) => {
        set((state) => ({
            ProfileForm: {
                ...state.ProfileForm,
                [name]: value
            }
        }))
    },
    ProfileDetails: null,
    ProfileDetailsRequest: async () => {
        try {
            let res = await axios.get(`/api/ReadProfile`)
            if (res.data["data"].length > 0) {
                set({ProfileDetails: res.data["data"][0]})
                set({ProfileForm: res.data["data"][0]})
            } else {
                set({ProfileDetails: []})
            }

        } catch (e) {
            unauthorized(e.response.status)
        }

    },
    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ProfileDetails: null})
            let res = await axios.post(`/api/UpdateProfile`, PostBody)
            return res.data["status"] === "Success";
        } catch (e) {
            unauthorized(e.response.status)
        }


    },
}))
export default UserStore