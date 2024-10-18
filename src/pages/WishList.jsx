import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { wishlistItems } = useSelector((state) => state.cart);

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleAddMoreItems = () => {
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 px-24">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="relative bg-white rounded-lg shadow" style={{ height: '250px', width: '200px' }}>
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-52 object-cover rounded-lg"
                            style={{ display: 'block', margin: '0 auto' }}
                        />
                        <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                        >
                            <img src="/assets/remove.png" alt="Remove" className="w-5 h-5" />
                        </button>
                    </div>
                ))}

                <div
                    className="bg-white rounded-lg shadow flex justify-center items-center cursor-pointer"
                    style={{ height: '250px', width: '200px' }}  
                    onClick={handleAddMoreItems}
                >
                    <img src="/assets/add.png" alt="Add Icon" className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
