import axios from "axios";
const url = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyA2DGmu4TYbl5USJ06fO7vhmY3PbQ8seO4";

export default axios.create({
  baseURL: url,
  params: {
    part: "snippet",
    maxResults: 5,
    key: API_KEY,
  },
});
