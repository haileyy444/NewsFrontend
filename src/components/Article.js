import React from "react";
import "./Article.css"
import { useFavorites } from "./Favorites";

const Popup = ({article, onClose}) => {
    const {favorites, toggleFavorite} = useFavorites();
 
 
    const isFavorited = Array.isArray(favorites) && favorites.some(fav => fav.url === article.url);
    
    if (!article) return null; // Prevents errors if article is undefined

    const handleFavoriteClick = () => {
        toggleFavorite(article); 
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>


                {/* <3 favorite Button in top left corner from stack overflow*/}
                {/* Favorite Button using Heart SVG */}
                <div id="heart" onClick={handleFavoriteClick}>
                    <svg className={`heart ${isFavorited ? 'favorited' : ''}`} viewBox="0 0 800 800">
                        <path 
                            className="heart-fill" 
                            d="M735.4,113.6C693.5,71.7,638,48.8,578.8,48.8s-114.8,23.1-156.7,65l-21.9,21.9L378,113.5c-41.9-41.9-97.7-65.1-156.9-65.1c-59,0-114.6,23.1-156.4,64.8C22.9,155-0.2,210.6,0,269.8C0,329,23.2,384.5,65.1,426.4l318.5,318.5c4.4,4.4,10.3,6.8,16.1,6.8s11.7-2.2,16.1-6.6l319.2-318c41.9-41.9,65-97.5,65-156.7C800.2,211.2,777.3,155.5,735.4,113.6z"
                        />
                        <path 
                            className="heart-outline" 
                            d="M735.4,113.6C693.5,71.7,638,48.8,578.8,48.8c-59.2,0-114.8,23.1-156.7,65l-21.9,21.9L378,113.5
                                c-41.9-41.9-97.7-65.1-156.9-65.1c-59,0-114.6,23.1-156.4,64.8C22.9,155-0.2,210.6,0,269.8C0,329,23.2,384.5,65.1,426.4l318.5,318.5
                                c4.4,4.4,10.3,6.8,16.1,6.8c5.8,0,11.7-2.2,16.1-6.6l319.2-318c41.9-41.9,65-97.5,65-156.7C800.2,211.2,777.3,155.5,735.4,113.6z
                                M702.8,394.7L399.7,696.5L97.4,394.1c-33.2-33.2-51.6-77.3-51.6-124.3s18.1-91.1,51.4-124.1c33.1-33.1,77.2-51.4,124-51.4
                                c47,0,91.2,18.3,124.5,51.6l38.3,38.3c9,9,23.4,9,32.4,0l38-38c33.2-33.2,77.5-51.6,124.3-51.6c46.8,0,90.9,18.3,124.1,51.4
                                c33.2,33.2,51.4,77.3,51.4,124.3C754.4,317.3,736.1,361.4,702.8,394.7z"
                        />
                    </svg>
                </div>



                {/* X Button in top right corner */}
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="popup-image-container">
                    <img src={article.urlToImage} alt={article.title} className="popup-image" />
                    <div className="popup-title-overlay">
                        <h2 className="popup-title">{article.title}</h2>
                    </div>
                </div>

                {/* Article Details Section */}
                <div className="popup-details">
                    <p><strong>Source:</strong> {article.source?.name || "Unknown Source"}</p>
                    <p><strong>Published on:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                    {article.author && <p><strong>Author:</strong> {article.author || "Unknown Author"}</p>}
                </div>

              

                {/* Article Content with Gradient Overlay */}
                <div className="popup-content-wrapper">
                      {/* Description */}
                          <p>{article.description}</p>
                    <div className="popup-content-snippet">
                        <p>{article.content}</p>
                    </div>

                    <div className="popup-gradient-overlay">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <button className="read-more-btn">Read Full Article</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Popup;