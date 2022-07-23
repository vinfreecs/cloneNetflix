import axios from "axios";

/*axios is used like postman for extracting apis*/

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
