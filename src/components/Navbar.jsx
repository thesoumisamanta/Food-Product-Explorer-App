import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName, getCategories, getProductsByCategory, sortProducts, getProductByBarcode } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.products.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm) {
            const debounceTimeout = setTimeout(() => {
                dispatch(getProductsByName(searchTerm));
            }, 300);
            return () => clearTimeout(debounceTimeout);
        }
    }, [searchTerm, dispatch]);

    useEffect(() => {
        if (barcode) {
            const debounceTimeout = setTimeout(() => {
                dispatch(getProductByBarcode(barcode));
            }, 300);
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

    
    const handleViewCart = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/cart');
        } else {
            navigate('/login');
        }
    };

    const handleViewWishlist = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/wishlist');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-green-500">
                            Food Explorer
                        </a>
                    </div>

                   
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>

                   
                    <div className="hidden md:flex space-x-4 items-center">
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
                            className="px-3 py-2 border border-gray-300 rounded-md max-w-xs"
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
                            className="px-3 py-2 border border-gray-300 rounded-md max-w-xs"
                        >
                            <option value="">Sort by</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
                            <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
                        </select>

                        
                        <img
                            src="/assets/viewCart.png" 
                            alt="Cart"
                            className="w-8 h-8 cursor-pointer"
                            onClick={handleViewCart}
                        />

                        
                        <img
                            src="/assets/viewWishlist.png" 
                            alt="Wishlist"
                            className="w-8 h-8 cursor-pointer"
                            onClick={handleViewWishlist}
                        />
                    </div>
                </div>
            </div>

            
            {menuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <input
                            type="text"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Search by barcode..."
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                        />

                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md max-w-xs"
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
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md max-w-xs"
                        >
                            <option value="">Sort by</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
                            <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
                        </select>

                        
                        <img
                            src="/assets/viewCart.png" 
                            alt="Cart"
                            className="w-8 h-8 cursor-pointer"
                            onClick={handleViewCart}
                        />

                        
                        <img
                            src="/assets/viewWishlist.png" 
                            alt="Wishlist"
                            className="w-8 h-8 cursor-pointer"
                            onClick={handleViewWishlist}
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
