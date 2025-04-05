const NEWS_API_URL = "https://newsapi.org/v2";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;


export async function fetchNews(query = "", category = "", pageSize = 30) {
  try {
    console.log("Fetching news with query:", query, "and category:", category);

    let url = `${NEWS_API_URL}/everything?apiKey=${API_KEY}&pageSize=${pageSize}`;

    // If a category is provided, use the 'top-headlines' endpoint instead of 'everything'
    if (category) {
      url = `${NEWS_API_URL}/top-headlines?apiKey=${API_KEY}&category=${category}&pageSize=${pageSize}`;
    } else if (query.trim() !== "") {
      url += `&q=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching news - response not ok: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news: ", error);
    return [];
  }
}
