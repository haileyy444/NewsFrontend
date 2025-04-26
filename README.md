
# About News Stand

This project was created by Hailey D'Angelo as a modern, visual-based News website optumized for web and mobile use. The site utilizes a News API that requires the site to be hosted locally or purchase a production key which I have not done. Recordings will be attached in the project file showcasing the working local site as the API key is not attached in github for security reasons. 

# Production Link
The production link WILL NOT WORK TO FETCH ANY ARTICLES UNLESS PAID $500 for production API_KEY but is https://newsstand-qhly.onrender.com to view basic structure and view the preloaded favorites of the testuser. 

# Entity Relationship Diagram:
This diagram represents the structure of the database. It illustrates the relationships between different entities (tables) and their attributes.
┌──────────────┐          ┌──────────────────┐
│   Users      │          │  FavoriteArticles │
├──────────────┤          ├───────────────────┤
│ username      │◄────────│ user_id (FK)       │
│ password      │         │ article_title      │
│ email         │         │ article_url        │
│ name          │         │ article_summary    │
└──────────────┘          │ article_author     │
                          │ article_published_at│
                          └───────────────────┘


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Usage:
 This project allows users to register, log in, and manage their favorite articles. 
 Environment variables that need to be set: API_KEY, SECRET_KEY, NODE_VERSION = 16.20.0 REACT_APP_BASE_URL = https://newsstandbe.onrender.com

# Features:
Login and Signup, adding a users favorite articles, filtering articles in search, searching by category, sources page with source popup showcasing that sources trending articles (filter by source), image first design.


# Contact Information
News API can be found at https://newsapi.org/docs/get-started
News Stand website created by @haileyy444 via GitHub