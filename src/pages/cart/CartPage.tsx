import { Link } from 'react-router-dom';
import './CartPage.css';
import { useCart } from '../../context/cart.context';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { TrashIcon } from '../../components/icons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import ConfirmAlert from '../../components/Alerts/ConfirmAlert';
import { useState } from 'react';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);


    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <div className="cart-page">
                    <hr className='cart-title-separator' />
                    <h2>Tu carrito está vacío</h2>
                    <hr className='cart-title-separator' />
                    <Link to="/search" className="button">
                        Buscar juegos
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="cart-page">
                <hr className='cart-title-separator' />
                <h2 className="cart-title">Tu Carrito</h2>
                <hr className='cart-title-separator' />
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-card">
                            <img src={item.imageUrl} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <div className="cart-item-name">
                                    <h3>{item.name}</h3>
                                </div>
                                <div className='cart-item-info'>
                                    <p className="cart-item-quantity">Cantidad: x{item.quantity}</p>
                                    <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <p className="cart-total"><strong>Total:</strong> ${total.toFixed(2)}</p>
                    <hr className='cart-summary-separator' />
                    <div className="cart-buttons">
                        <button
                            className="button checkout-button"
                            onClick={() => setShowSuccessAlert(true)}
                        >
                            Finalizar compra
                        </button>
                        <button
                            className="button clear-button"
                            onClick={() => setShowConfirmAlert(true)}
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
            <Footer />

            {showSuccessAlert && (
                <SuccessAlert
                    message="¡Compra realizada con éxito!"
                    onClose={() => {
                        setShowSuccessAlert(false)
                        clearCart()
                    }}
                />
            )}

            {showConfirmAlert && (
                <ConfirmAlert
                    message="¿Estás seguro de querer vaciar el carrito?"
                    onConfirm={() => {
                        clearCart();
                        setShowConfirmAlert(false);
                    }}
                    onCancel={() => setShowConfirmAlert(false)}
                />
            )}
        </>
    );
};

export default CartPage;
