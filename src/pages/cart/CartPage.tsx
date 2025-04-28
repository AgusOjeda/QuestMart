import { Link } from 'react-router-dom';
import './CartPage.css'; // Ahora te paso estilos básicos
import { useCart } from '../../context/cart.context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TrashIcon } from '../../components/icons';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <>
            <Header/>
            <div className="cart-page">
                <h2>Tu carrito está vacío</h2>
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
        <Header/>
        <div className="cart-page">
            <h2 className="cart-title">Tu Carrito</h2>
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
                <div className="cart-buttons">
                    <button className="button checkout-button" onClick={() => alert('Proceso de compra...')}>
                        Finalizar compra
                    </button>
                    <button className="button clear-button" onClick={clearCart}>
                        Vaciar carrito
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default CartPage;
