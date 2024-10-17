import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsByBarcode } from '../features/productSlice';

const ProductDetail = () => {
    const { barcode } = useParams();
    const dispatch = useDispatch();
    const { productDetails, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (barcode) {
            console.log('Fetching product with barcode:', barcode); // Debug log
            dispatch(getProductDetailsByBarcode(barcode));
        }
    }, [barcode, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading...</div>
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
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Product Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{productDetails.product_name}</h1>
                    <img
                        src={productDetails.image_url}
                        alt={productDetails.product_name}
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Information Sections */}
                <div className="grid gap-6">
                    {/* Ingredients Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-bold text-xl mb-4">Ingredients</h2>
                        <p className="text-gray-700">{productDetails.ingredients_text || 'No ingredients information available'}</p>
                    </div>

                    {/* Nutritional Values Section */}
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

                    {/* Labels Section */}
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