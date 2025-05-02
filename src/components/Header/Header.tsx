import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CartIcon, SearchIcon, MenuIcon, CloseIcon, TrashIcon } from '../icons.tsx';
import './Header.css';
import { useCart } from '../../context/cart.context.tsx';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMiniCart, setShowMiniCart] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearch(query);
        } else {
            setSearch('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (showMiniCart) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showMiniCart]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search.trim())}`);
            setShowSearch(false);
        }
    };

    const handleToggleMiniCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMiniCart(prev => !prev);
    }

    const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <header className="header">
                <div className="header__top">
                    <div className="header__left mobile-only">
                        <button className="header__icon" onClick={() => setShowMenu(prev => !prev)} aria-label="Abrir menú">
                            <MenuIcon />
                        </button>
                    </div>

                    <div className="header__center">
                        <Link to="/" className="header__logo" onClick={() => { setShowMenu(false); setShowSearch(false); }}>
                            <img src="/logo.png" alt="Logo" />
                        </Link>

                        <form className="header__search desktop-only floating-label-input" onSubmit={handleSearch}>
                            <input
                                type="text"
                                id="desktop-search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={search ? 'has-content' : ''}
                                aria-label="Buscar juegos en escritorio"
                            />
                            <label htmlFor="desktop-search">Buscar juegos</label>
                            <button type="submit" className="header__icon desktop-only" aria-label="Buscar">
                                <SearchIcon />
                            </button>
                        </form>
                    </div>

                    <div className="header__right">
                        <button className="header__icon mobile-only" onClick={() => setShowSearch(prev => !prev)} aria-label="Abrir búsqueda">
                            <SearchIcon />
                        </button>
                        <button className="header__icon cart-icon" onClick={handleToggleMiniCart} aria-label={`Carrito (${totalItems} items)`}>
                            <CartIcon />
                            {totalItems > 0 && (
                                <span className="cart-count">{totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Búsqueda Móvil */}
                
                <div className={`header__searchbar mobile-only ${showSearch ? 'active' : ''}`}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Buscar juegos en móvil"
                        />
                        <button type="submit" className="search-button" aria-label="Buscar">
                            <SearchIcon />
                        </button>
                    </form>
                </div>

                <nav className={`header__menu ${showMenu ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={() => setShowMenu(false)}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/search" onClick={() => setShowMenu(false)}>Juegos</Link>
                        </li>
                        <li>
                            <Link to="/historial" onClick={() => setShowMenu(false)}>Historial</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setShowMenu(false)}>Contacto</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Mini-cart */}

            <div
                className={`mini-cart-overlay ${showMiniCart ? 'active' : ''}`}
                onClick={() => setShowMiniCart(false)}
                aria-hidden={!showMiniCart}
            >
                <div
                    className="mini-cart"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mini-cart-title"
                >
                    <div className="mini-cart__header">
                        <h2 id="mini-cart-title">Tu carrito</h2>
                        <button
                            className="mini-cart__close-btn"
                            onClick={() => setShowMiniCart(false)}
                            aria-label="Cerrar carrito"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <p className="mini-cart__empty-message">El carrito está vacío.</p>
                    ) : (
                        <>
                            <ul className="mini-cart__list">
                                {cart.map((item) => (
                                    <li key={item.id} className="mini-cart__item">
                                        <img src={item.imageUrl} alt={item.name} className="mini-cart__item-image" />
                                        <div className="mini-cart__item-details">
                                            <Link to={`/product/${item.id}`} className="mini-cart__item-name">
                                                {item.name}
                                            </Link>
                                            <div className="mini-cart__item-meta-wrapper">
                                                <span className="mini-cart__item-meta">
                                                    {item.quantity} × ${item.price.toFixed(2)}
                                                </span>
                                                <div className="mini-cart__quantity-controls">
                                                    <button
                                                        onClick={() => decrementQuantity(item.id)}
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        −
                                                    </button>
                                                    <button
                                                        onClick={() => incrementQuantity(item.id)}
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mini-cart__item-actions">
                                            <span className="mini-cart__item-total">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button onClick={() => removeFromCart(item.id)} className="mini-cart__remove-item">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mini-cart__subtotal">
                                <span>Subtotal:</span>
                                <span>${cartSubtotal.toFixed(2)}</span>
                            </div>
                        </>
                    )}

                    {cart.length > 0 && (
                        <Link
                            to="/carrito"
                            className="view-cart-button"
                            onClick={() => setShowMiniCart(false)}
                        >
                            Ver carrito completo
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
