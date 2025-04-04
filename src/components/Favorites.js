import { createContext, useContext, useEffect, useState } from "react";
import CapstoneApi from "../api";

const FavoritesContext = createContext();

export function FavoritesProvider({children, currentUser}) {
    const [favorites, setFavorites] = useState([]);

    console.log("current user: ", currentUser);
    console.log("user favs ", favorites);


    useEffect(() => {
        async function fetchFavorites() {
            if (currentUser) {
                let favs = await CapstoneApi.getUserFavorites(currentUser.username);
                const favoritesWithKeys = favs.map(fav => ({
                    ...fav,
                    uniqueKey: `${fav.url}` // Generate uniqueKey for each favorite
                }));
                setFavorites(favoritesWithKeys);
            }
        }
        fetchFavorites();
    }, [currentUser]);


    
    async function toggleFavorite(article) {
        const uniqueKey = `${article.url}`;
        const isFavorited = favorites.some(fav => fav.uniqueKey === uniqueKey);
        try {


            setFavorites(prevFavorites => {
                const updatedFavorites = isFavorited
                ? prevFavorites.filter(fav => fav.uniqueKey !== uniqueKey)
                : [...prevFavorites, {...article, uniqueKey}];
                return updatedFavorites;
            })
    
            if (isFavorited) {
                // Remove from favorites
                await CapstoneApi.removeFavorite(currentUser.username, article.url);

            } 
            else {
                // Add to favorites
                await CapstoneApi.addFavorite(currentUser.username, article);
              
            }
        } catch (e) {
            console.error("Error toggling favorite", e);
             // In case of error, we can optionally revert the optimistic update
             setFavorites(prevFavorites => {
                const updatedFavorites = isFavorited
                    ? [...prevFavorites, { ...article, uniqueKey }]  // Revert if error on removing
                    : prevFavorites.filter(fav => fav.uniqueKey !== uniqueKey);  // Revert if error on adding
                return updatedFavorites;
            });
        }
    }
    
    return (
        <FavoritesContext.Provider value={{favorites, toggleFavorite}} >
            {children}
            </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}