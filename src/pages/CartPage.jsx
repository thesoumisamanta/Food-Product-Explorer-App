import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearFlashMessage } from '../features/cartSlice'; 

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const flashMessage = useSelector((state) => state.cart.flashMessage);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        
        alert("Proceeding to checkout...");
    };

    
    React.useEffect(() => {
        if (flashMessage) {
            const timeout = setTimeout(() => {
                dispatch(clearFlashMessage());
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [flashMessage, dispatch]);

    const totalAmount = cartItems.reduce((total, item) => {
        const itemPrice = item.price || 0; 
        return total + itemPrice;
    }, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            {flashMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {flashMessage}
                </div>
            )}

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 transition duration-200"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                            Total: ${totalAmount.toFixed(2)} 
                        </h3>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
