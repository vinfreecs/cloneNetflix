import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const imageBaseUrl = "https://image.tmdb.org/t/p/original/";
function Row(props) {
  //this useState is a hook used in react instead of class
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    //we are using this [] because we want to loadit only once , useEffect is used to fetch the data
    async function fetchData() {
      // by this we are requesting the tmdb to give the data and by using await we are waiting until we get something else
      //the [] is called dependency and here fetchUrl is the depenency
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2 className="row_title">{props.title}</h2>
      <div className="row_posters">
        {/*this to horizontal poster scroll in a particular row*/}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
            src={`${imageBaseUrl}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
