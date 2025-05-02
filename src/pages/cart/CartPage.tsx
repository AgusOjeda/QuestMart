import { Link } from 'react-router-dom';
import './CartPage.css';
import { useCart } from '../../context/cart.context';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { TrashIcon } from '../../components/icons';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import ConfirmAlert from '../../components/Alerts/ConfirmAlert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <div className="cart-page">
                    <hr className='cart-title-separator' />
                    <h2 className='cart-title'>Tu carrito está vacío</h2>
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
                        <article key={item.id} className="cart-card">
                            <img src={item.imageUrl} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <Link to={`/product/${item.id}`} className="cart-item-name">
                                    <h3>{item.name}</h3>
                                </Link>
                                <div className='cart-item-info'>
                                    <p className="cart-item-quantity">Cantidad: x{item.quantity}</p>
                                    <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                    <div className="quantity-buttons">
                                        <button
                                            className="quantity-button"
                                            onClick={() => decrementQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="quantity-button"
                                            onClick={() => incrementQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </article>
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
                        clearCart();
                        navigate('/');
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
