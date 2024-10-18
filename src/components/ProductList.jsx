import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import PulseLoader from 'react-spinners/PulseLoader';
import { getAllProducts } from '../features/productSlice';

const ProductList = () => {
    const { sortedProducts, loading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const location = useLocation();

    const [visibleProducts, setVisibleProducts] = useState(5); // Start with 5 products
    const [loadingMore, setLoadingMore] = useState(false); // Control infinite scroll loading
    const [isMounted, setIsMounted] = useState(false); // Track if component has mounted

    // Fetch initial batch of products
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Scroll to top and reset visible products when navigating back from details page
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        window.scrollTo(0, 0); // Scroll to top when navigating back
        setVisibleProducts(5); // Reset visible products
    }, [location, isMounted]);

    // Infinite scroll handler
    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !loadingMore && // Prevent triggering when already loading
            visibleProducts < sortedProducts.length // Ensure more products exist to load
        ) {
            setLoadingMore(true); // Start loading more products
        }
    };

    // Add and remove scroll event listener
    useEffect(() => {
        const scrollHandler = () => handleScroll();

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [loadingMore, visibleProducts, sortedProducts.length]);

    // Handle loading more products when the user scrolls
    useEffect(() => {
        if (loadingMore && visibleProducts < sortedProducts.length) {
            setTimeout(() => {
                setVisibleProducts((prev) => prev + 5); // Load 5 more products
                setLoadingMore(false); // Reset loading state after products are added
            }, 1000);
        }
    }, [loadingMore, visibleProducts, sortedProducts.length]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 mt-16" style={{ minHeight: '100vh' }}>
            {loading ? (
                <div className="col-span-3 flex justify-center my-4">
                    <PulseLoader color="#3498db" loading={true} size={15} />
                </div>
            ) : (
                sortedProducts.slice(0, visibleProducts).map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))
            )}

            {loadingMore && (
                <div className="col-span-3 flex justify-center my-4">
                    <PulseLoader color="#3498db" loading={true} size={15} />
                </div>
            )}
        </div>
    );
};

export default ProductList;
