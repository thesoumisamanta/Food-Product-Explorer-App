import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName, getCategories, getProductsByCategory, sortProducts, getProductByBarcode } from '../features/productSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const Navbar = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.products);  // Use global loading state
    const categories = useSelector((state) => state.products.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getCategories());  // Fetch categories on mount
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(getProductsByName(searchTerm));
    };

    const handleBarcodeSearch = () => {
        if (barcode) {
            dispatch(getProductByBarcode(barcode));
        }
    };

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
        <nav className="bg-blue-500 p-4 flex justify-between">
            <input
                type="text"
                className="p-2 rounded"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-white p-2 rounded">Search</button>

            <input
                type="text"
                className="p-2 rounded"
                placeholder="Search by barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
            />
            <button onClick={handleBarcodeSearch} className="bg-white p-2 rounded">Search Barcode</button>

            <select onChange={handleCategoryChange} value={selectedCategory} className="p-2 rounded">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <select onChange={handleSort} className="p-2 rounded">
                <option value="">Sort By</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="nutrition-asc">Nutrition Grade (Ascending)</option>
                <option value="nutrition-desc">Nutrition Grade (Descending)</option>
            </select>

            {/* {loading && (
                <div className="flex justify-center items-center">
                    <PulseLoader color="#ffffff" loading={true} size={10} />
                </div>
            )} */}
        </nav>
    );
};

export default Navbar;
