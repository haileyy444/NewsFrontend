import React, {createContext, useContext, useEffect, useState} from "react";
import {Routes, Route, RouterProvider, useNavigate, Link} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";

import Profile from "./components/Profile";
import Home from "./Home";

import './App.css';
import SignUp from "./components/SignUp";
import {jwtDecode} from "jwt-decode";
import CapstoneApi from "./api";
import LoginForm from "./components/Login";
import CategoriesPage from "./components/CategoriesPage";
import ArticleSearchResults from "./components/ArticleSearchResults";
import { FavoritesProvider } from "./components/Favorites";


//create user context - sessions
const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {

    if(token) {
      try {
        const decoded = jwtDecode(token);
        // console.log("Decoded token ", decoded)
        setCurrentUser(decoded);
        CapstoneApi.setToken(token);
      }
      catch (e) {
        console.log("Error decoding token ",token, e);
        setCurrentUser(null)
      }
 
    }
    else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, [token]); //run once on component mount

  const handleLogin = async (loginData, onError) => {
    const { username, password} = loginData;

    // Simple validation 
    if (!username || !password) {
      onError("Please enter all required fields")
      console.log("Please enter all required fields.");
      return;
    }
    try {
      const response = await CapstoneApi.login(loginData);
      // console.log("response app.js handlelogin", response);
      if(response && response.token) {
        localStorage.setItem("token", response.token);
       
        setToken(response.token);

        const decoded = jwtDecode(response.token);
        setCurrentUser(decoded);
        navigate("/");
      }
      else {
        console.log("Login error: No token recieved");
        onError("Invalid username or password");
      } 
    }
    catch(error) {
      console.log("error logging in ", error);
      onError("Invalid username or password");
    }

  }
  const handleSignup = async(signupData) => {
    const { username, password, email, firstName, lastName} = signupData;

    // Simple validation 
    if (!username || !password || !email || !firstName || !lastName) {
      console.log("Please enter all required fields.");
      return;
    }

    try{
      const response = await CapstoneApi.register(signupData);
      // console.log("Revcieved token from signup ", response.token)
     
      if(response.token) {
        localStorage.setItem("token", response.token);
 
        setToken(response.token);
     
        const decoded = jwtDecode(response.token);
        setCurrentUser(decoded);

        setTimeout(() => {
          navigate('/');
        }, 100);
      }
      else {
        console.log("Signup Error with Token - non recieved: Token is ", token);
      }
    
 
    } catch (e) {
      console.log("Error signing up ", e)
    }
    
  }
  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setCurrentUser(null);
    navigate('/');
  }
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return (
    <UserContext.Provider value={{currentUser, handleLogout}}>
      <FavoritesProvider currentUser={currentUser}>

   
       <NavBar logout={handleLogout} currentUser={currentUser} />
       <main>
         <Routes>
          {/* if not logged in */}
            {/* default to /login page with button at bottom to create new acccount for new users */}
           {!currentUser ? (
            <>

             <Route path="/login" element={<LoginForm handleSubmit={handleLogin}/>} />
             <Route path="/signup" element={<SignUp handleSubmit={handleSignup}/>} />

            </>
           ) : (
            <>
            {/* only logged in users */}
       
            <Route path="/profile" element={<Profile currentUser={currentUser}/>} />
            <Route path="/sources" element={<SearchPage currentUser={currentUser} search="source" />}/> 
            <Route path="/categories/:category" element={<CategoriesPage currentUser={currentUser} />}/>
            <Route path="/articles" element={<ArticleSearchResults />} />
            <Route path="/articles/:search" element={<ArticleSearchResults/>} />
       
            </>

           )} 
            <Route exact path="/" element={<Home currentUser={currentUser}/>} />
            <Route
                  path="*"
                  element={
                    <div className="notFoundContainer">
                      <h1>404</h1>
                      <p>Hmmm. I can't seem to find the page that you want.</p>
                      <Link to="/" className="homeLink">Go Back Home</Link>
                    </div>
                  }
                />
                

          </Routes>
       </main>
      </FavoritesProvider>
    </UserContext.Provider>
  );
}

export default App;
