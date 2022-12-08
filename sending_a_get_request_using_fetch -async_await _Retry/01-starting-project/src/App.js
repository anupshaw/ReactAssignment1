import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [intervalId, setIntervalId] = useState(null);

  async function fetchMoviesHandler() {
    //  console.log('calling api');
    console.log("in start", intervalId);
    // clearInterval(id);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      console.log(response);
      if (!response.ok) {
        throw new Error("....Retrying");
      }
      const data = await response.json();
      console.log(data);
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          release: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);

      let id = setInterval(async () => {
        // console.log(id);
        setIntervalId(id);
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch("https://swapi.dev/api/film");

          if (!response.ok) {
            throw new Error("....Retrying");
          }
          const data = await response.json();

          const transformedMovies = data.results.map((movieData) => {
            return {
              id: movieData.episode_id,
              title: movieData.title,
              release: movieData.release_date,
              openingText: movieData.opening_crawl,
            };
          });

          clearInterval(intervalId);
          setIntervalId(null);
          setMovies(transformedMovies);
          setError(null);
          setIsLoading(false);
        } catch(error) {
          setError(error.message);
          setIsLoading(false);
        }
      }, 5000);
      console.log("in end", id);
    }
  }

  const cancelHandler = () => {
    console.log("cancel", intervalId);
    clearInterval(intervalId);
    setError(null);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>Found No movies</p>}
        {!isLoading && error && (
          <p>
            {error} <button onClick={cancelHandler}>Cancel</button>
          </p>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
