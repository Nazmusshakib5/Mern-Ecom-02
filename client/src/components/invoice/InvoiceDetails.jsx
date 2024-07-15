import React, {useEffect, useState} from 'react';
import CartStore from "../../store/CartStore.js";
import {Link, useParams} from "react-router-dom";
import CartSkeleton from "../../skeleton/CartSkeleton.jsx";
import NoData from "../layout/NoData.jsx";
import ReviewStore from "../../store/ReviewStore.js";
import validationHelper from "../../utility/validationHelper.js";
import toast from "react-hot-toast";
import ReviewSubmitButton from "./ReviewSubmitButton.jsx";
import {Modal} from "react-bootstrap";

const InvoiceDetails = () => {
    const [show, setShow] = useState(false)
    const {InvoiceDetails, InvoiceDetailsRequest} = CartStore()
    const {ReviewFormData, ReviewFormOnChange, ReviewSaveRequest} = ReviewStore()
    const {id} = useParams()
    const ReviewModal = (productID) => {
        setShow(true)
        ReviewFormOnChange("productID", productID)
    }
    const handleCloseModal = () => setShow(false)
    const submitReview = async () => {
        if (validationHelper.IsEmpty(ReviewFormData.des)) {
            toast.error("Description Required")
        } else {
            let res = await ReviewSaveRequest(ReviewFormData)
            res ? toast.success("Thanks For Your Feedback") : toast.error("Something Went Wrong !")
            setShow(false)
        }
    }
    useEffect(() => {
        (async () => {
            await InvoiceDetailsRequest(id)
        })()
    }, []);
    if (InvoiceDetails === null) {
        return (
            <div className="container">
                <div className="row">
                    <CartSkeleton/>
                </div>
            </div>
        )
    } else if (InvoiceDetails.length === 0) {
        return (
            <NoData/>
        )
    } else {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    InvoiceDetails.map((item, i) => {
                                        return (<li key={i}
                                                    className="list-group-item d-flex flex-column flex-lg-row justify-content-between align-items-start">
                                                <img
                                                    className="rounded-1"
                                                    alt=""
                                                    width="90"
                                                    height="auto"
                                                    src={item["product"]["image"]}
                                                />
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-medium h6">
                                                        {item["product"]["title"]}
                                                    </div>
                                                    <span>
                                                        Unit Price: {item["price"]}, Total:{" "}
                                                        {item["price"] * parseInt(item["qty"])},
                                                    </span>
                                                    <span>
                                                        Qty: {item["qty"]}, Size: {item["size"]}, Color:{" "}
                                                        {item["color"]}
                                                    </span>

                                                </div>
                                                <button
                                                    onClick={() => ReviewModal(item["productID"])}
                                                    className="btn btn-success my-4 my-lg-0"
                                                >
                                                    Create Review
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <h6>Create Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-2">
                                    <label className="form-label">Rating</label>
                                    <select
                                        onChange={(e) =>
                                            ReviewFormOnChange("rating", e.target.value)
                                        }
                                        className="form-select"
                                    >
                                        <option value="5">5 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="col-12 p-2">
                                    <label className="form-label">Review</label>
                                    <textarea
                                        onChange={(e) => ReviewFormOnChange("des", e.target.value)}
                                        className="form-control"
                                        rows={7}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-dark" onClick={handleCloseModal}>
                            Close
                        </button>
                        <ReviewSubmitButton
                            text="Submit"
                            className="btn btn-success"
                            onClick={submitReview}
                        />
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default InvoiceDetails;