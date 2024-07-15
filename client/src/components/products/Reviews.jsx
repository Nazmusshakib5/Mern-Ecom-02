import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";


const Reviews = () => {
    const {ReviewList} = ProductStore()
    return (
        <div>
            <ul className="list-group list-group-flush mt-4">
                {
                    ReviewList !== null && (
                        ReviewList.length > 0 ? (
                            ReviewList.map((items, i) => {
                                return (
                                    <li key={i} className="list-group-item bg-transparent">
                                        <h6 className="m-0 p-0"><i class="bi bi-person"></i> {items["profile"]["cus_name"]}
                                        </h6>
                                        <StarRatings
                                            rating={parseFloat(items["rating"])}
                                            starRatedColor="red"
                                            starDimension="15px"
                                            starSpacing="2px"/>
                                        <p>{items["des"]}</p>
                                    </li>
                                )
                            })
                        ) : (
                            <h4> No Reviews For This Product</h4>
                        )
                    )
                }

            </ul>
        </div>
    );
};

export default Reviews;