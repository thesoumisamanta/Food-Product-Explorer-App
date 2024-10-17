import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { product_name, image_url, categories, ingredients_text, nutrition_grades_tags, code } = product; // Change barcode to code

    return (
        <div className="border p-4 rounded">
            <img src={image_url} alt={product_name} className="w-full h-32 object-cover mb-2 rounded" />
            <h2 className="font-bold text-lg">{product_name}</h2>
            <p className="text-sm text-gray-700">Category: {categories}</p>
            {ingredients_text && <p className="text-sm text-gray-700">Ingredients: {ingredients_text}</p>}
            {nutrition_grades_tags && nutrition_grades_tags.length > 0 && (
                <p className="text-sm text-gray-700">Nutrition Grade: {nutrition_grades_tags[0].toUpperCase()}</p>
            )}
            <Link
                to={`/product/${code}`}
                className="text-blue-500 hover:underline"
            >
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;