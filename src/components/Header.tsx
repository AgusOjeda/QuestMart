import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CartIcon, SearchIcon, MenuIcon } from './icons.tsx';
import './Header.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Se sicroniza el valor de la busqueda con la URL en caso de regresar de pagina
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearch(query);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(search.trim())}`);
        setShowSearch(false);
    };

    return (
        <header className="header">
            <div className="header__top">
                <div className="header__left mobile-only">
                    <button className="header__icon" onClick={() => setShowMenu(prev => !prev)}>
                        <MenuIcon />
                    </button>
                </div>

                <div className="header__center">
                    <div className="header__logo desktop-only">
                        <img src="/logo.png" alt="Logo" />
                    </div>

                    <form className="header__search desktop-only floating-label-input" onSubmit={handleSearch}>
                        <input
                            type="text"
                            id="desktop-search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={search ? 'has-content' : ''}
                        />
                        <label htmlFor="desktop-search">Buscar juegos</label>
                        <button
                            type="submit"
                            className="header__icon desktop-only"
                        >
                            <SearchIcon />
                        </button>
                    </form>

                </div>
                <div className="header__right">
                    <button className="header__icon mobile-only" onClick={() => setShowSearch(prev => !prev)}>
                        <SearchIcon />
                    </button>
                    <div className="header__icon cart-icon">
                        <CartIcon />
                    </div>
                </div>
            </div>
            <div className={`header__searchbar mobile-only ${showSearch ? 'active' : ''}`}>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar juegos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="search-button"
                    >
                        <SearchIcon />
                    </button>
                </form>
            </div>
            <nav className={`header__menu ${showMenu ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/search">Juegos</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
