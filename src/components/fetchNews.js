const NEWS_API_URL = "https://newsapi.org/v2";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;


if (!API_KEY) {
  throw new Error("API_KEY is not defined. Please check your environment variables.");
}


export async function fetchNews(query = "", category = "", pageSize = 30) {
  try {
    console.log("Fetching news with query:", query, "and category:", category);
    let url;

    // let url = `${NEWS_API_URL}/everything?apiKey=${API_KEY}&pageSize=${pageSize}`;

    // // If a category is provided, use the 'top-headlines' endpoint instead of 'everything'
    // if (category) {
    //   url = `${NEWS_API_URL}/top-headlines?apiKey=${API_KEY}&category=${category}&pageSize=${pageSize}`;
    // } else if (query.trim() !== "") {
    //   url += `&q=${encodeURIComponent(query)}`;
    // }

    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error(`Error fetching news - response not ok: ${response.status} ${response.statusText}`);
    // }

    // const data = await response.json();
    // return data.articles;1

    let urlParams = new URLSearchParams({
      apiKey: API_KEY,
      pageSize: pageSize,
    });

    if (category) {
      urlParams.append("category", category);
      url = `${NEWS_API_URL}/top-headlines?${urlParams.toString()}`;
    } else if (query.trim() !== "") {
      urlParams.append("q", encodeURIComponent(query));
      url = `${NEWS_API_URL}/everything?${urlParams.toString()}`;
    } else {
      url = `${NEWS_API_URL}/everything?${urlParams.toString()}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Check your API key.");
      } else if (response.status === 404) {
        throw new Error("Not Found - Check the endpoint or query.");
      } else {
        throw new Error(`Error fetching news: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data.articles || []; // Return empty array if no articles
  } 
  catch (error) {
    console.error("Error fetching news: ", error);

    return { error: error.message }; // Return error message for better handling
  }
}
