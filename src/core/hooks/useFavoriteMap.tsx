import { createContext, useContext, useState } from 'react';
const FavoriteContext = createContext<{
    favoriteMap: { [key: string]: boolean };
    setFavoriteMap: (obj: { [key: string]: boolean }) => void;
    getFavoriteMap: () => void;
}>({
    favoriteMap: {},
    setFavoriteMap: () => {},
    getFavoriteMap: () => {},
});

export function FavoriteProvider({ children }) {
    const [favoriteMap, setFavoriteMap] = useState({});
    function getFavoriteMap() {
        return favoriteMap;
    }

    return (
        <FavoriteContext.Provider
            value={{
                favoriteMap,
                setFavoriteMap,
                getFavoriteMap,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}

export const useFavorite = () => useContext(FavoriteContext);
