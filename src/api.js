import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CapstoneApi {
  // the token for interactive with the API will be stored here.\
//TOKENs

static token = null; 

  static setToken(newToken) {

    if (!newToken || newToken.split(".").length !== 3) {
      console.error("Invlaid token format recieved " , newToken);
      return;
    }
    this.token = newToken.trim();
    // localStorage.setItem("token", newToken);
    // JoblyApi.token = newToken;
  }

  static getToken() {
    return this.token || localStorage;
  }

  static clearToken() {
    this.token = null;
    localStorage.removeItem("token");
    // JoblyApi.token.removeItem();
  }

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const token = CapstoneApi.getToken() || localStorage.getItem('token');
    if (!token) {
      console.log("No token in api.js request function found")
    }

    // console.log("Using token for request from api.js request", CapstoneApi.token, localStorage.getItem('token'));
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` }; //API.token
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  /** Get all companies. */


    /** Get all jobs. */
//JOBS
    
  /** Apply for a job. */

  // static async applyToJob(username, jobId) {
  //   let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  //   return res;
  // }
  
     /** Get user profile. */
//USER PROFILE
     static async getUserProfile(username) {

      let res = await this.request(`users/${username}`);


      return res.user;
    }
     /** Update user profile. */

     static async updateUserProfile(userData) {
      const {username, ...updateData} = userData;
      const res = await this.request(`users/${username}`, updateData, "patch");
      return res.user;
    }

//AUTH
    static async login(credentials) {
      let res = await this.request("auth/token", credentials, "post");
      if(res && res.token) {
      
        this.setToken(res.token);
        // JoblyApi.token = res.token;
        return res;
      }
      else {
        console.log("Login failed. No token recieved");
        throw new Error("Login Failed")
      }

     
    }
    static async register(userData) {

      try {
        let res = await this.request("auth/register", userData, "post")

        localStorage.setItem("token", res.token);
        CapstoneApi.setToken(res.token);
      
        return res;
      }
      catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          const errorMessage = err.response.data.error.message || "Registration failed!";
          throw new Error(errorMessage); 
        } else {
          let message = err.response?.data?.error?.message || "Something went wrong. Please try again.";
          throw Array.isArray(message) ? message : [message];
        }
      }
    }
    static logout() {
      this.clearToken();
      console.log("Logging out")
    }


    



    //ADDING FAVORITES
    static async addFavorite(username, article) {
      let res = await this.request(`users/${username}/favorites`, article, "POST");
      return res.favorites || [];  // Return updated list of favorites
    }
    
    static async removeFavorite(username, articleURL) {
      const encodedURL = encodeURIComponent(articleURL);
      const response = await this.request(`users/${username}/favorites/${encodedURL}`, {}, "DELETE");
      return response.data;
    }
    

    static async getUserFavorites(username) {
      let res = await this.request(`users/${username}/favorites`);
      return res.favorites || [];  // Ensure it returns an empty array if no favorites
    }
    

 
  
}




export default CapstoneApi;