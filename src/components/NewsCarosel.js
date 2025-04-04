import React, { useEffect, useRef, useState } from "react";
import { fetchNews } from "./fetchNews";
import "./NewsCarosel.css" ;
import Popup from "./Article";
import { useFavorites } from "./Favorites";

const NewsFeed = ({category, categoryName}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [popupArticle, setPopupArticle] = useState(null);
    const carouselRef = useRef(null);
    const {favorites } = useFavorites();

    useEffect(() => {
        async function getNews() {
            const newsData = await fetchNews("us", category);
            setArticles(newsData);
            setIsLoading(false);
        }
        getNews();
    }, [category]);

    if(loading) return <h2>Loading News...</h2>;

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 350; 
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const openPopup = (article) => {
        setPopupArticle(article)
    }
    const closePopup = () => {
        setPopupArticle(null);
    }

    return (
        <div className="news-container">
            <h3>{categoryName}</h3>
            <div className="rectangle">
            <div className="carousel-container">
                <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
                <div className="carousel" ref={carouselRef}>
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="news-card"
                            style={{ backgroundImage: `url(${article.urlToImage})` }}
                            onClick={() => openPopup(article)} // Open popup on click
                        >
                            <div className="news-title">
                                <span>{article.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
            </div>
</div>      
            {popupArticle && (
                <Popup article={popupArticle} onClose={closePopup} /> // Show the popup
            )}
        </div>
    )
}

export default NewsFeed;