import { createContext, useContext, useState, useEffect } from 'react';
import { Game } from '../types/rawg.types';

interface HistoryContextType {
    history: Game[];
    addToHistory: (item: Game) => void;
    removeFromHistory: (id: number) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [history, setHistory] = useState<Game[]>(() => {
        const storedHistory = localStorage.getItem('history');
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history]);

    const addToHistory = (item: Game) => {
        setHistory(prev => {
            const filtered = prev.filter(x => x.id !== item.id);
            return [item, ...filtered];
        });
    };

    const removeFromHistory = (id: number) => {
        setHistory(prev => prev.filter(x => x.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
