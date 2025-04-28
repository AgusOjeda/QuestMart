import React from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useHistory } from '../../context/historial.context';
import GameCard from '../../components/GameCard/GameCard';
import './HistoryPage.css'
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {

    const { history} = useHistory();

    return (
        <>
            <Header />
            <main className="history-page">
                <hr className='history-separator'/>
                <h1>Historial</h1>
                <hr className='history-separator'/>
                <div className='history-layout'>
                    <div className='content-container'>
                        {history.length === 0 ? (
                            <div className='empty-history'>
                                <p>Tu historial se encuentra vacío.</p>
                                <p>¡Explora nuevos juegos y vuelve más tarde!</p>
                                <Link to="/search" className='explore-button'>
                                    Explorar juegos
                                </Link>
                            </div>
                        ) : (
                            <div className='games-container'>
                            {history.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HistoryPage;
