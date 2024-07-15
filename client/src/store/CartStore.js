import {create} from "zustand"
import axios from "axios";
import {unauthorized} from "../utility/utility.js";


const CartStore = create((set) => ({
    isCartSubmit: false,
    CartForm: {productID: "", color: "", size: ""},
    CartFormOnChange: (name, value) => {
        set((state) => ({
            CartForm: {
                ...state.CartForm,
                [name]: value
            }
        }))
    },
    CartSaveRequest: async (PostBody, productID, quantity) => {
        try {
            set({isCartSubmit: true})
            PostBody.productID = productID;
            PostBody.qty = quantity;
            let res = await axios.post(`/api/SaveCartList`, PostBody)
            return res.data["status"] === "Success";
        } catch (e) {
            unauthorized(e.response.status)
        } finally {
            set({isCartSubmit: false})
        }
    },
    CartList: null,
    CartCount: 0,
    CartTotal: 0,
    CartVat: 0,
    CartPayableTotal: 0,
    CartListRequest: async () => {
        try {
            let res = await axios.get(`/api/CartList`)
            set({CartList: res.data["data"]})
            set({CartCount: (res.data["data"]).length})
            let total = 0
            res.data["data"].forEach((element) => {
                let price;
                if (element["product"]["discount"] === true) {
                    price = parseFloat(element["product"]["discountPrice"])
                } else {
                    price = parseFloat(element["product"]["price"])
                }
                total += parseFloat(element["qty"]) * price
            })
            let vat = total * 0.05
            let payable = total + vat
            set({CartTotal: total})
            set({CartVat: vat})
            set({CartPayableTotal: payable})

        } catch (e) {
            unauthorized(e.response.status)
        }
    },
    RemoveCartListRequest: async (cartID) => {
        try {
            set({CartList: null})
            await axios.post(`/api/RemoveCartList`, {"_id": cartID})
        } catch (e) {
            unauthorized(e.response.status)
        }
    },
    CreateInvoiceRequest: async () => {
        try {
            set({isCartSubmit: true})
            let res = await axios.get(`/api/CreateInvioce`)
            window.location.href = res.data["data"]["GatewayPageURL"]
        } catch (e) {
            unauthorized(e.response.status)
        } finally {
            set({isCartSubmit: false})
        }
    },
    InvoiceList: null,
    InvoiceListRequest: async () => {
        try {
            let res = await axios.get("/api/InvoiceList")
            if (res.data["status"] === "Success") {
                set({InvoiceList: res.data["data"]})
            }
        } catch (e) {
            unauthorized(e.response.status)
        }
    },
    InvoiceDetails: null,
    InvoiceDetailsRequest: async (id) => {
        try {
            let res = await axios.get(`/api/InvoiceProductList/${id}`)
            if (res.data["status"] === "Success") {
                set({InvoiceDetails: res.data["data"]})
            }
        } catch (e) {
            unauthorized(e.response.status)
        }
    },
}))
export default CartStore