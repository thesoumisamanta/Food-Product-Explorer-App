import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { product_name, image_url, categories, ingredients_text, nutrition_grades_tags, code } = product;

    return (
        <div className="flex flex-row m-3 bg-white shadow-lg rounded-lg w-full md:w-96">
            {/* Image Section */}
            <div className="w-1/3 p-4 flex items-center justify-center">
                <img
                    src={image_url}
                    alt={product_name}
                    className="w-full h-48 object-contain rounded-lg"
                />
            </div>

            {/* Content Section */}
            <div className="w-2/3 flex flex-col p-4 overflow-hidden">
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{product_name}</h2>
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Category:</span> {categories}
                    </p>
                    {ingredients_text && (
                        <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">Ingredients:</span> {ingredients_text}
                        </p>
                    )}
                    {nutrition_grades_tags && nutrition_grades_tags.length > 0 && (
                        <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">Nutrition Grade:</span> {nutrition_grades_tags[0].toUpperCase()}
                        </p>
                    )}
                </div>
                <div>
                    <Link
                        to={`/product/${code}`}
                        className="inline-block mt-3 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;