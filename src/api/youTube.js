import axios from "axios";
const url = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyAjwRfatzQ76r338YpqyRmUeHjrxPFaBI0";

export default axios.create({
  baseURL: url,
  params: {
    part: "snippet",
    maxResults: 5,
    key: API_KEY,
  },
});
