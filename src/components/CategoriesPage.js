import "./CategoriesPage.css";
import Popup from "./Article";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;


const CategoriesPage = () => {
  const { category } = useParams(); // Get category from URL
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupArticle, setPopupArticle] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!category) return;

    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );
        if (response.status === 429) {
            throw new Error("Too many API requests for the free API. Please try again tomorrow or purchase the full API.");
        }
        const data = await response.json();

        if (data.status === "ok" && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }    
        else {
          if(data.status === 426) {
            throw new Error("API requires purchase to view articles with production link")
          }
          else {
            throw new Error(`Failed to fetch Articles from ${category} - API requires purchase to view articles with production link`);
   
          }
          
        }
      } catch (e) {
        setError(e.message);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const openPopup = (article) => {
    setPopupArticle(article);
  };

  const closePopup = () => {
    setPopupArticle(null);
  };

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );

  // if (error) return <p className="error-message">Error: {error}</p>;

  return (
        <div className="categories">
          <h1>
            {category === "business"
              ? "Business & Finance"
              : category === "technology"
              ? "Latest Tech News"
              : category === "entertainment"
              ? "Hollywood & Entertainment"
              : category === "sports"
              ? "Sports Highlights"
              : category === "health"
              ? "Health & Wellness"
              : "General News Stories"}
          </h1>
   
    
      {/* Category Buttons */}
      <div className="categories-bar">
        {["business", "entertainment", "general", "health", "science", "sports", "technology"].map((cat) => (
          <Link key={cat} to={`/categories/${cat}`}>
            <button className={`category-button ${category === cat ? "active" : ""}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          </Link>
        ))}
      </div>

         {/* Show Error Message but Keep Layout */}
      {error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      ) : (
        // Show Articles Only If No Error
        <div className="news-grid">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : articles.length > 0 ? (
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
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}

      {/* Popup */}
      {popupArticle && <Popup article={popupArticle} onClose={closePopup} />}
    </div>
  );
};
export default CategoriesPage;
