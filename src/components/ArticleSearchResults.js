import React, { useEffect, useState } from 'react';
import './ArticleSearchResults.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from './Article';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;


const ArticleSearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sources: '',
    from: '',
    to: '',
    language: '', 
    sortBy: 'relevancy', // Default to Relevancy
  });
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupArticle, setPopupArticle] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      fetchArticles(query);
    }
  }, [location.search]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const updatedFilters = { ...filters, [event.target.name]: event.target.value };
    setFilters(updatedFilters);
    fetchArticles(searchQuery, updatedFilters); // Fetch with updated filters immediately
  };

  const fetchArticles = (query, filtersToApply = filters) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      q: query,
      sources: filtersToApply.sources,
      from: filtersToApply.from,
      to: filtersToApply.to,
      language: filtersToApply.language,
      sortBy: filtersToApply.sortBy,
      pageSize: 30,
      apiKey: API_KEY,
    });

    fetch(`https://newsapi.org/v2/everything?${params}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 429) {
            throw new Error("Too many API requests for free News API. Please try again later.");
          } else if (res.status >= 500) {
            throw new Error("Server error. Please try again later.");
          } else {
            return res.json().then(data => {
              throw new Error(data.message || "Failed to fetch articles.");
            });
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.status !== "ok") {
          throw new Error(data.message || "API request failed");
        }
        setArticles(data.articles || []);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/articles?q=${encodeURIComponent(searchQuery)}`);
    fetchArticles(searchQuery);
  };


  const openPopup = (article) => {
    setPopupArticle(article);
  };

  const closePopup = () => {
    setPopupArticle(null);
  };

  return (
    <div className="article-search-results">
      <h1>Search News Articles</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className='search-form'>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      
      </form>

      {/* Filters Section */}
      <div className="filters-container">
        <input
          type="text"
          name="sources"
          placeholder="News Source"
          value={filters.sources}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="from"

          value={filters.from}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="to"
       
          value={filters.to}
          onChange={handleFilterChange}
        />
        <select name="language" value={filters.language} onChange={handleFilterChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
          <option value="he">Hebrew</option>
          <option value="it">Italian</option>
          <option value="nl">Dutch</option>
          <option value="no">Norwegian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="sv">Swedish</option>
          <option value="zh">Chinese</option>
        </select>
        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="relevancy">Relevance</option>
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Newest</option>
        </select>
      </div>

   

      <div className="news-grid">
      {isLoading ? (
      <div className="loading-overlay">
      <div className="spinner"></div>
    
    </div>
    ) : error ? (
        <p className="error-message">API Error - API requires purchase to view articles with production link.</p>
      ) : 
       
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
          )
       )}
      </div>

      {/* Popup */}
      {popupArticle && <Popup article={popupArticle} onClose={closePopup} />}
    </div>
  );
};

export default ArticleSearchResults;
