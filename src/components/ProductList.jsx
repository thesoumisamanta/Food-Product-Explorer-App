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

    const [visibleProducts, setVisibleProducts] = useState(5); 
    const [loadingMore, setLoadingMore] = useState(false); 
    const [isMounted, setIsMounted] = useState(false); 

    
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        window.scrollTo(0, 0); 
        setVisibleProducts(5); 
    }, [location, isMounted]);

    
    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !loadingMore && 
            visibleProducts < sortedProducts.length 
        ) {
            setLoadingMore(true); 
        }
    };

    
    useEffect(() => {
        const scrollHandler = () => handleScroll();

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [loadingMore, visibleProducts, sortedProducts.length]);

    
    useEffect(() => {
        if (loadingMore && visibleProducts < sortedProducts.length) {
            setTimeout(() => {
                setVisibleProducts((prev) => prev + 5); 
                setLoadingMore(false); 
            }, 1000);
        }
    }, [loadingMore, visibleProducts, sortedProducts.length]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 " style={{ minHeight: '100vh' }}>
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
