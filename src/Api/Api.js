import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2", 
});

const API_KEY = "493074a25b1f4ec8ac9c7eafe0da2146";

const getNews = () => {
  return api.get(`/top-headlines?country=us&apiKey=${API_KEY}`);
};

const searchedNews = (query) => {
  return api.get(`/everything?q=${query}&apiKey=${API_KEY}`);
};

export default {
  getNews,
  searchedNews,
};
