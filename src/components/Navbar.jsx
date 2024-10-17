import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName, getCategories, getProductsByCategory, sortProducts, getProductByBarcode } from '../features/productSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const Navbar = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.products.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getCategories());  // Fetch categories on mount
    }, [dispatch]);

    // Fetch products by name as the user types
    useEffect(() => {
        if (searchTerm) {
            const debounceTimeout = setTimeout(() => {
                dispatch(getProductsByName(searchTerm));
            }, 300); // Adjust debounce time as needed
            return () => clearTimeout(debounceTimeout);
        }
    }, [searchTerm, dispatch]);

    // Fetch product by barcode as the user types
    useEffect(() => {
        if (barcode) {
            const debounceTimeout = setTimeout(() => {
                dispatch(getProductByBarcode(barcode));
            }, 300); // Adjust debounce time as needed
            return () => clearTimeout(debounceTimeout);
        }
    }, [barcode, dispatch]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        if (category) {
            dispatch(getProductsByCategory(category));
        }
    };

    const handleSort = (e) => {
        dispatch(sortProducts({ sortBy: e.target.value }));
    };

    return (
        <nav className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between">
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-green-500">
                    Food Explorer
                </a>
            </div>

            {/* Input Fields */}
            <div className="flex space-x-4 items-center">
                <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Search by barcode..."
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                />

                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={handleSort}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="">Sort by</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
                    <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
                </select>
            </div>

           
        </nav>
    );
};

export default Navbar;
