import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ currentUser, logout }) {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false); // News dropdown state
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // User dropdown state
  
  const searchBoxRef = useRef(null); // Add a ref for the search box
  
  const newsDropdownRef = useRef(null); // Reference to the News dropdown for outside click detection
  const userDropdownRef = useRef(null);
  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle News dropdown visibility on click (for the "News" dropdown)
  const toggleNewsDropdown = (event) => {
    setNewsDropdownOpen(!newsDropdownOpen);
    setUserDropdownOpen(false); // Close the username dropdown if open
  };
  const toggleUserDropdown = (event) => {
    setUserDropdownOpen(!userDropdownOpen);
  setNewsDropdownOpen(false); // Close the username dropdown if open
  };

  // Close dropdown if clicked outside3
  const handleClickOutside = (event) => {
    if (
      newsDropdownRef.current &&
      !newsDropdownRef.current.contains(event.target) &&
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target) &&
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target)
    ) {
      setNewsDropdownOpen(false);
      setUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // Article search functions
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/articles?q=${encodeURIComponent(searchQuery)}`);
      
      // Reset search input
      setSearchQuery("");
  
      // Close the navbar if it's open (assuming it's a dropdown or mobile menu)
      setNewsDropdownOpen(false);
    }
  };
  
  

  return (
    <nav className="NavBar">
      <div className="news nav-left" ref={newsDropdownRef}>
        {!currentUser ? (
          <a href="/" className="Capstone">News</a> 
        ) : (
          <div className="dropdown">
            <span onClick={toggleNewsDropdown} className="nav-header">News</span>
            <div className={`cat news-dropdown-menu ${newsDropdownOpen ? "open" : ""}`}>
              <div className="article-search-bar">
                <h4 className="slide">Search Articles</h4>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Article Keyword"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    className="search-input"
                    ref={searchBoxRef}
                  />
                </div>
              </div>
              <h4 className="slide">Categories</h4>
              <Link to="/categories/business" className="dropdown-item">Business</Link>
              <Link to="/categories/entertainment" className="dropdown-item">Entertainment</Link>
              <Link to="/categories/general" className="dropdown-item">General</Link>
              <Link to="/categories/health" className="dropdown-item">Health</Link>
              <Link to="/categories/science" className="dropdown-item">Science</Link>
              <Link to="/categories/sports" className="dropdown-item">Sports</Link>
              <Link to="/categories/technology" className="dropdown-item">Technology</Link>
              <h4><a href="/sources" className="slide">News Sources</a></h4>
            </div>
          </div>
        )}
      </div>

      {/* Centered "News Stand" link when logged in */}
      {currentUser && (
        <div className="news-stand">
          <Link to="/" className="news-stand-link">
            <img src="/NewsStand.png" alt="NewsStand" />
          </Link>
        </div>
      )}

      <div className="nav-right">
        <div className="hamburger" onClick={toggleMenu}>☰</div>
        
        {!menuOpen && !currentUser ? (
          <div className="Components">
            <a href="/login" className="nav-item">Login</a>
            <a href="/signup" className="nav-item">Signup</a>
          </div>
        ) : (
          <>
            {!menuOpen && currentUser && (
              <div
                className="username nav-item dropdown"
                onClick={toggleUserDropdown}
              >
                <span className="nav-header username" >{currentUser.username}</span>
                {userDropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profile" className="dropdown-item">Profile</a>
                    <a href="/" onClick={(e) => { e.preventDefault(); logout(); }} className="dropdown-item">Logout</a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          {!currentUser ? (
            <>
              <a href="/login" className="nav-item" onClick={toggleMenu}>Login</a>
              <a href="/signup" className="nav-item" onClick={toggleMenu}>Signup</a>
            </>
          ) : (
            <>
              <a href="/profile" className="nav-item" onClick={toggleMenu}>Profile</a>
              <a href="/" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
