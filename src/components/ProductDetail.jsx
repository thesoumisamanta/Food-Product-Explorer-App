import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { getProductDetailsByBarcode } from '../features/productSlice';
import { addToCart, addToWishlist, clearFlashMessage } from '../features/cartSlice';

const ProductDetail = () => {
    const { barcode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productDetails, loading } = useSelector(state => state.products);
    const { flashMessage } = useSelector(state => state.cart);

    useEffect(() => {
        if (barcode) {
            dispatch(getProductDetailsByBarcode(barcode));
        }
    }, [barcode, dispatch]);

    const handleBackToHome = () => {
        navigate('/');
    };

    // Add to Cart functionality
    const handleAddToCart = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            dispatch(addToCart(productDetails));
        }
    };

    // Add to Wishlist functionality
    const handleAddToWishlist = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            const newItem = {
                id: productDetails.id,
                name: productDetails.product_name,
                imageUrl: productDetails.image_url,
            };

            dispatch(addToWishlist(newItem));
        }
    };

    
    useEffect(() => {
        if (flashMessage) {
            const timeout = setTimeout(() => {
                dispatch(clearFlashMessage());
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [flashMessage, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PulseLoader color="#3498db" loading={true} size={15} />
            </div>
        );
    }

    
    if (!productDetails) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="text-xl mb-4">Product not found</div>
                <div className="text-gray-600">Barcode: {barcode}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-10">
            <div className="max-w-4xl mx-auto mt-10">
                
                {flashMessage && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded flex justify-between items-center">
                        <span>{flashMessage}</span>
                        <button
                            onClick={() => dispatch(clearFlashMessage())}
                            className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                            aria-label="Close flash message"
                        >
                            &times;
                        </button>
                    </div>
                )}

                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">{productDetails.product_name}</h1>
                    <img
                        src={productDetails.image_url}
                        alt={productDetails.product_name}
                        className="w-36 mx-auto rounded-lg shadow-lg"
                    />
                </div>

                
                <div className="flex justify-center space-x-6 mb-8">
                    
                    <img
                        src="/assets/back-to-home.png" 
                        alt="Back to Home"
                        className="w-8 h-8 cursor-pointer"
                        onClick={handleBackToHome}
                    />

                    
                    <img
                        src="/assets/add-to-cart.png" 
                        alt="Add to Cart"
                        className="w-8 h-8 cursor-pointer"
                        onClick={handleAddToCart}
                    />

                    
                    <img
                        src="/assets/addToWishlist.png" 
                        alt="Add to Wishlist"
                        className="w-8 h-8 cursor-pointer"
                        onClick={handleAddToWishlist}
                    />
                </div>

                
                <div className="grid gap-6">
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-bold text-xl mb-4">Ingredients</h2>
                        <p className="text-gray-700">
                            {productDetails.ingredients_text || 'No ingredients information available'}
                        </p>
                    </div>

                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-bold text-xl mb-4">Nutritional Values</h2>
                        {productDetails.nutriments ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Energy</p>
                                    <p>{productDetails.nutriments.energy_100g || '0'} kcal/100g</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Fat</p>
                                    <p>{productDetails.nutriments.fat_100g || '0'}g/100g</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Carbohydrates</p>
                                    <p>{productDetails.nutriments.carbohydrates_100g || '0'}g/100g</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Proteins</p>
                                    <p>{productDetails.nutriments.proteins_100g || '0'}g/100g</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-700">No nutritional information available</p>
                        )}
                    </div>

                   
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-bold text-xl mb-4">Labels</h2>
                        <div className="flex flex-wrap gap-2">
                            {productDetails.labels_tags && productDetails.labels_tags.length > 0 ? (
                                productDetails.labels_tags.map((label, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {label.replace('en:', '')}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-700">No labels available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
