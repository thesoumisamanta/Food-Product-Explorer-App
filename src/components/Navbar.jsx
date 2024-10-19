import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName, getCategories, getProductsByCategory, sortProducts, getProductByBarcode } from '../features/productSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const categories = useSelector((state) => state.products.categories);
    const [searchTerm, setSearchTerm] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const isHomePage = location.pathname === '/';
    const isCartPage = location.pathname === '/cart';
    const isWishlistPage = location.pathname === '/wishlist';

    useEffect(() => {
        if (!isHomePage) {
            setMenuOpen(false);
        }
    }, [isHomePage]);

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

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="relative">
            <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <div
                            onClick={handleLogoClick}
                            className="flex items-center justify-start w-12 h-12 cursor-pointer"
                        >
                            <img src="/assets/food.png" alt="Logo" className="h-8" />
                        </div>


                        <div className="md:hidden flex absolute inset-x-0 justify-center">
                            {!isCartPage && (
                                <button
                                    onClick={handleViewCart}
                                    className="w-12 h-12 flex items-center justify-center cursor-pointer mx-1"
                                >
                                    <img
                                        src="/assets/viewCart.png"
                                        alt="Cart"
                                        className="w-8 h-8"
                                    />
                                </button>
                            )}
                            {!isWishlistPage && (
                                <button
                                    onClick={handleViewWishlist}
                                    className="w-12 h-12 flex items-center justify-center cursor-pointer mx-1"
                                >
                                    <img
                                        src="/assets/wish-list.png"
                                        alt="Wishlist"
                                        className="w-8 h-8"
                                    />
                                </button>
                            )}
                        </div>

                        {isHomePage && (
                            <div className="md:hidden z-20">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="w-12 h-12 flex items-center justify-center cursor-pointer"
                                    aria-label="Toggle menu"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
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
                        )}

                        <div className="hidden md:flex space-x-4 items-center">
                            {isHomePage && (
                                <>
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
                                </>
                            )}

                            {!isCartPage && (
                                <button
                                    onClick={handleViewCart}
                                    className="w-12 h-12 flex items-center justify-center cursor-pointer"
                                >
                                    <img
                                        src="/assets/viewCart.png"
                                        alt="Cart"
                                        className="w-8 h-8"
                                    />
                                </button>
                            )}
                            {!isWishlistPage && (
                                <button
                                    onClick={handleViewWishlist}
                                    className="w-12 h-12 flex items-center justify-center cursor-pointer"
                                >
                                    <img
                                        src="/assets/wish-list.png"
                                        alt="Wishlist"
                                        className="w-8 h-8"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isHomePage && menuOpen && (
                    <div className="md:hidden absolute w-full bg-white shadow-lg">
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
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Sort by</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
                                <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
                            </select>
                        </div>
                    </div>
                )}
            </nav>

            <div className="h-16"></div>
        </div>
    );
};

export default Navbar;
