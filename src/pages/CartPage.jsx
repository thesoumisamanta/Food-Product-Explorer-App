{/* <a href="https://www.flaticon.com/free-icons/shopping-cart" title="shopping cart icons">Shopping cart icons created by Freepik - Flaticon</a> */}

{/* <a href="https://www.flaticon.com/free-icons/add-to-cart" title="add to cart icons">Add to cart icons created by Freepik - Flaticon</a> */}

{/* <a href="https://www.flaticon.com/free-icons/wishlist" title="wishlist icons">Wishlist icons created by Pixel perfect - Flaticon</a> */}

{/* <a href="https://www.flaticon.com/free-icons/wishlist" title="wishlist icons">Wishlist icons created by Freepik - Flaticon</a> */}

{/* <a href="https://www.flaticon.com/free-icons/back-to-home" title="back to home icons">Back to home icons created by Fantasyou - Flaticon</a> */}

{/* <a href="https://www.flaticon.com/free-icons/overview" title="overview icons">Overview icons created by Kiranshastry - Flaticon</a> */}





import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearFlashMessage } from '../features/cartSlice'; // Import your actions

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const flashMessage = useSelector((state) => state.cart.flashMessage);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        // Add your checkout logic here
        alert("Proceeding to checkout...");
    };

    // Clear flash message after 2 seconds
    React.useEffect(() => {
        if (flashMessage) {
            const timeout = setTimeout(() => {
                dispatch(clearFlashMessage());
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [flashMessage, dispatch]);

    const totalAmount = cartItems.reduce((total, item) => {
        const itemPrice = item.price || 0; // Fallback to 0 if price is undefined
        return total + itemPrice;
    }, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
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
                                    <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p> {/* Safeguard here */}
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
                            Total: ${totalAmount.toFixed(2)} {/* Safeguard here */}
                        </h3>
                        <button
                            onClick={handleCheckout}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
