
import React, { useEffect, useState } from "react";
import CapstoneApi from "../api";
import { Link } from "react-router-dom";
import "./Profile.css";
import Popup from "./Article";
import { useFavorites } from "./Favorites";


function Profile({ currentUser }) {
  const {favorites} = useFavorites();
  
  const [popupArticle, setPopupArticle] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.username) {
      async function fetchProfile() {
        try {
          const userProfile = await CapstoneApi.getUserProfile(currentUser.username);
         
          setProfile(userProfile);
     
          
          setFormData({
            username: userProfile.username,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email
          });
        } catch (error) {
          console.error("Error fetching profile data", error);
          setError("Failed to load profile data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }

      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const updatedProfile = await CapstoneApi.updateUserProfile(formData);
      setIsEditing(false);
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile: ", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return (
      <div className="needUserErrorContainer">
        <h2>
          Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to view your Profile
        </h2>
      </div>
    );
  }

  const openPopup = (article) => {

    setPopupArticle(article);
}
const closePopup = () => {
    setPopupArticle(null);
}
  return (
    <section className="profile">
      <h1>{currentUser.username}'s Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <h2>Edit Profile Data</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div className="profile-info">
          <h2>Profile Data</h2>
          <h3>Username: {profile.username}</h3>
          <h3>First Name: {profile.firstName}</h3>
          <h3>Last Name: {profile.lastName}</h3>
          <h3>Email: {profile.email}</h3>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}

      {/* Error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Favorite Articles */}
      <div className="favorites-section">
        <h2 className="fav-articles-header">Favorite Articles</h2>
        {favorites.length > 0 ? (
          <div className="favorites-list">
            {favorites.map((article, index) => (
               <div key={index} className="fav-news-card" onClick={() => openPopup(article)}>
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
            ))}
          </div>
        ) : (
          <p>No favorite articles yet.</p>
        )}
        {/* Popup */}
      {popupArticle && <Popup article={popupArticle} onClose={closePopup} />}
      </div>
      
    </section>
  );
}

export default Profile;
