import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useHistory } from '../../context/historial.context';
import GameCard from '../../components/GameCard';
import './HistoryPage.css'


const HistoryPage: React.FC = () => {

    const { history} = useHistory();

    return (
        <>
            <Header />
            <main className="history-page">
                <h1>Historial</h1>
                <div className="history-layout">
                    <div className="content-container">
                        <div className="games-container">
                            {history.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HistoryPage;
