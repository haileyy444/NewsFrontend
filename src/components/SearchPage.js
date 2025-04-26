import React, { useEffect, useState } from 'react';
import "./SearchPage.css"
import {Link} from "react-router-dom";
import PopupCompany from './Company';
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;




const SearchPage = ({search}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [sources, setSources] = useState([]);
    const [filteredSources, setFilteredSources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    //get news sources
    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
                if (response.status === 429) {
                    throw new Error("Too many API requests for the free API. Please try again tomorrow or purchase the full API.");
                }

                const data = await response.json();

                if (data.status === "ok") {
                    setSources(data.sources);
                    setFilteredSources(data.sources);
                }
                else {
                    if(data.status === 426) {
                        throw new Error("API requires purchase to view articles with production link")
                    }
                    else {
                    throw new Error("Failed to fetch Sources");
                    }
                }
            }
            catch (e) {
                setError(e.message);
            }
            finally {setIsLoading(false);}
        }
        fetchSources();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        //filter based on search query
        const filtered = sources.filter((source) => 
        source.name.toLowerCase().includes(query));
        setFilteredSources(filtered);
    }


    if (isLoading) {
        return (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        );
      }
      
    if(error) {
        return <p className='error-message'>Error: {error}</p>
    }


    const handleSourceClick = (source) => {
        // console.log("Opening popup for:", source.name); // 🔍 Debug log
        setSelectedCompany(source); //for popup
        
    }
    const closePopup = ()=> {
        setSelectedCompany(null);
    }

    return (
        <div className="sources-search-page">
            <h1>News Sources</h1>
    
            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search News Sources"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
    
            {/* News Sources Grid */}
            <div className="sources-grid">
                {filteredSources.length > 0 ? (
                  filteredSources.map((source) => (
                    <div
                        key={source.id}
                        className="source-box"
                        onClick={() => handleSourceClick(source)} // Open popup
                    >
                        <div className="source-title">
                            <span>{source.name}</span>
                        </div>
                        <div className="source-description">
                            <p>{source.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No articles found.</p>
              )}
            </div>
    
            {/* Popup - Ensure it's outside the grid */}
            {selectedCompany && (
                <PopupCompany company={selectedCompany} onClose={closePopup} />
            )}
        </div>
    );
    
};
export default SearchPage;