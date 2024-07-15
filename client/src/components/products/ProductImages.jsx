import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import ProductStore from "../../store/ProductStore.js";

const ProductImages = () => {
    const {ProductDetails} = ProductStore()
    const images = [
        {
            original: ProductDetails[0]["details"]["img1"],
            thumbnail: ProductDetails[0]["details"]["img1"],
        }, {
            original: ProductDetails[0]["details"]["img2"],
            thumbnail: ProductDetails[0]["details"]["img2"],
        }, {
            original: ProductDetails[0]["details"]["img3"],
            thumbnail: ProductDetails[0]["details"]["img3"],
        }, {
            original: ProductDetails[0]["details"]["img4"],
            thumbnail: ProductDetails[0]["details"]["img4"],
        }, {
            original: ProductDetails[0]["details"]["img5"],
            thumbnail: ProductDetails[0]["details"]["img5"],
        }, {
            original: ProductDetails[0]["details"]["img6"],
            thumbnail: ProductDetails[0]["details"]["img6"],
        }, {
            original: ProductDetails[0]["details"]["img7"],
            thumbnail: ProductDetails[0]["details"]["img7"],
        }, {
            original: ProductDetails[0]["details"]["img8"],
            thumbnail: ProductDetails[0]["details"]["img8"],
        },
    ]
    return (
        <div>
            <ImageGallery autoPlay={true} items={images}/>
        </div>
    );
};

export default ProductImages;