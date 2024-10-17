import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { product_name, image_url, categories, ingredients_text, nutrition_grades_tags, code } = product;

    // Helper function to truncate text
    const truncateText = (text, limit) => {
        return text.length > limit ? text.slice(0, limit) + '...' : text;
    };

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row m-3 w-full">
            {/* Image Section */}
            <div className="w-full md:w-1/3 p-4 flex items-center justify-center">
                <img
                    src={image_url}
                    alt={product_name}
                    className="w-full h-48 object-contain rounded-lg"
                />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/3 p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{product_name}</h2>
                <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Category:</span> {categories ? truncateText(categories, 20) : 'N/A'}
                </p>
                {ingredients_text && (
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Ingredients:</span> {truncateText(ingredients_text, 30)}
                    </p>
                )}
                {nutrition_grades_tags && nutrition_grades_tags.length > 0 && (
                    <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Nutrition Grade:</span> {nutrition_grades_tags[0].toUpperCase()}
                    </p>
                )}

                <Link
                    to={`/product/${code}`}
                    className="mt-auto bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition duration-300 w-32 text-center"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
