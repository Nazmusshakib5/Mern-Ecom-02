import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceHolder from "../assets/images/image.json";

const LegalContentSkeleton = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-4">
                        {/*<Skeleton count={30}/>*/}
                        {
                            Array.from({length: 10}).map((a,b) => {
                                return (
                                    <Skeleton key={b} count={3}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalContentSkeleton;