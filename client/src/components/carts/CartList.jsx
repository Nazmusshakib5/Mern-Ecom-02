import React, {useEffect} from 'react';
import CartStore from "../../store/CartStore.js";
import NoData from "../layout/NoData.jsx";
import CartSkeleton from "../../skeleton/CartSkeleton.jsx";
import CartSubmitButton from "./CartSubmitButton.jsx";

const CartList = () => {
    const {
        CartListRequest, CartList, CartTotal, CartVat, CartPayableTotal, RemoveCartListRequest, CreateInvoiceRequest
    } = CartStore()
    useEffect(() => {
        (async () => {
            await CartListRequest()
        })()
    }, []);
    const remove = async (cartID) => {
        await RemoveCartListRequest(cartID)
        await CartListRequest()
    }
    if (CartList === null) {
        return (<div className="container">
            <div className="row">
                <CartSkeleton/>
            </div>
        </div>)
    } else if (CartList.length === 0) {
        return (<NoData text="No Product Added To The Cart List"/>)
    } else {
        return (<div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-4">
                        <ul className="list-group list-group-flush">
                            {CartList.map((item, i) => {
                                let price = item["product"]["price"]
                                if (item["product"]["discount"] === true) {
                                    price = item["product"]["discountPrice"]
                                }
                                return (<li key={i}
                                            className="list-group-item d-flex justify-content-between align-items-start">
                                    <img className="rounded-1" width="90" height="auto"
                                         src={item['product']['image']}/>
                                    <div className="ms-2 me-auto">
                                        <p className="fw-lighter m-0">{item['product']['title']}</p>
                                        <p className="fw-lighter my-1">Unit
                                            Price: {price},Qty: {item['qty']},
                                            Size: {item['size']},
                                            Color: {item['color']}</p>
                                        <p className=" h6 fw-bold m-0 text-dark">Total <i
                                            className="bi bi-currency-dollar"></i>
                                            {parseFloat(price) * parseInt(item['qty'])} </p>
                                    </div>
                                    <button onClick={async () => {
                                        await remove(item["_id"])
                                    }}
                                            className="btn btn-sm btn-outline-danger"><i
                                        className="bi bi-trash"></i>
                                    </button>
                                </li>)
                            })} </ul>
                        <div className="my-4">
                            <ul className="list-group bg-transparent list-group-flush">
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end">Total: <i
                                            className="bi bi-currency-dollar"/>{CartTotal} </span>
                                </li>
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end"> Vat(5%): <i
                                            className="bi bi-currency-dollar"/>{CartVat}</span>
                                </li>
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end"> Payable: <i
                                            className="bi bi-currency-dollar"/>{CartPayableTotal}</span>
                                </li>
                                <li className="list-group-item bg-transparent ">
                                        <span className="float-end">
                                           <CartSubmitButton text="Check Out " onClick={async () => {
                                               await CreateInvoiceRequest()
                                           }} className="btn px-5 mt-2 btn-success"/>
                                        </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

};

export default CartList;