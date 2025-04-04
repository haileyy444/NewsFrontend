import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Home.css"
import { Link, useNavigate } from "react-router-dom";
import NewsFeed from "./components/NewsCarosel";

function Home({companies, jobs, currentUser}) {
  const navigate = useNavigate();
  return (
    <section className="home"> 
    {currentUser ? (
      <>
        
            <h1>
              Explore the News {currentUser.username}!
              </h1>
              
     
            <div className="loggedIn-options">
              <NewsFeed category="general" categoryName="Trending"/>
              <NewsFeed category="business" categoryName="Business & Finance"/>
              <NewsFeed category="technology" categoryName="Latest Tech News"/>
              <NewsFeed category="entertainment" categoryName="Entertainment"/>

              <NewsFeed category="sports" categoryName="Sports Highlights"/>
              <NewsFeed category="health" categoryName="Health & Wellness"/>
         
            </div>
      </>
    ) : (
      <>
          <div className="background-cover">
          <h1 className="welcome-header">
            Welcome to
          </h1>
          <div className="news-stand">
          
            <img src="/NewsStand-removebg.png" alt="NewsStand" className="home-logo"/>
     
        </div>
          <h2 className="slogan-h2">All the news, in one convient place</h2>
          <div className="loggedOut-options">

        
          <button onClick={() => navigate('/login')}>
                   LOGIN
                </button>
                <button onClick={() => navigate('/signup')}>
                    SIGNUP
                </button>


          </div>
           </div>
      </>
    )}
    </section>
  );
}

export default Home;
