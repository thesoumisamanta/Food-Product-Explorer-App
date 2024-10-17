import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { getAllProducts } from '../features/productSlice';

const ProductList = () => {
    const { sortedProducts, loading } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const [visibleProducts, setVisibleProducts] = useState(5); // Start with 5 products
    const [loadingMore, setLoadingMore] = useState(false); // Control infinite scroll loading

    // Fetch initial batch of products
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loadingMore && visibleProducts < sortedProducts.length) {
                setLoadingMore(true);
                // Simulate loading delay
                setTimeout(() => {
                    setVisibleProducts((prev) => prev + 5); // Load 5 more products
                    setLoadingMore(false);
                }, 1000); // Simulate 1 second loading
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingMore, visibleProducts, sortedProducts.length]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {loading ? (
                <div className="col-span-3 flex justify-center my-4">
                    <PulseLoader color="#3498db" loading={true} size={10} />
                </div>
            ) : (
                sortedProducts.slice(0, visibleProducts).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}

            {loadingMore && (
                <div className="col-span-3 flex justify-center my-4">
                    <PulseLoader color="#3498db" loading={true} size={10} />
                </div>
            )}
        </div>
    );
};

export default ProductList;
