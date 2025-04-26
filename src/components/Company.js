import React, { useEffect, useState } from "react";
import "./Company.css"
import { useFavorites } from "./Favorites";
import Popup from "./Article";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;



const PopupCompany = ({company, onClose}) => {
    const [articles, setArticles] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [popupArticle, setPopupArticle] = useState(null);

    useEffect(() => {
        async function fetchCompanyArticles() {
            if (!company || !company.name) {
                console.error("Invalid company data:", company);
                return;
            }
            setIsLoading(true);
            setError(null);

           try {


            //the API already limits the fetch results based on my free version
            const response = await fetch(`https://newsapi.org/v2/everything?q=${company.name}&apiKey=${API_KEY}`);

                const data = await response.json();
                // console.log("API Response:", data);

                if(data.status !== "ok") {
                    throw new Error (data.message || "API request failed");
                }
                setArticles(data.articles || []);
 

           }
           catch (e) {
            console.error("Error fetching company articles: ", e);
            setError("Failed to load articles for this company.");
           }
           finally {
            setIsLoading(false);
           }
        }

        if (company && company.name) {
            fetchCompanyArticles();
        }

    }, [company]);

    const openPopup = (article) => {
        setPopupArticle(article);
      };
    
    const closePopup = () => {
        setPopupArticle(null);
      };


    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button className="close-btn" onClick={onClose}>×</button>
  
          {/* Company Info Section */}
          <div className="popup-coname">
            <h2>{company.name}</h2>
          </div>
          <div className="popup-details">
            <p>{company.description}</p>
          
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                            <button className="read-more-btn">Visit News Source Website</button>
                </a>
          </div>
  
          {/* Articles Section */}
          <h3 className="recent-articles">Recent Articles from {company.name}</h3>
          <div className="news-grid">
            
            {isLoading ? (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Loading articles...</p>
              </div>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : articles.length === 0 ? (
              <p>No articles found for {company.name}.</p>
            ) : (
              articles.map((article, index) => (
                <div key={index} className="news-card" onClick={() => openPopup(article)}>
                  <img
                    src={article.urlToImage || "/placeholder.jpg"}
                    alt={article.title}
                    className="news-image"
                  />
                  <div className="news-content">
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-description">{article.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
  
          {/* Popup for individual article details */}
          {popupArticle && <Popup article={popupArticle} onClose={closePopup} />}
        </div>
      </div>
    );
  };
  
  export default PopupCompany;