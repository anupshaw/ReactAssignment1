import React, {  useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

let id;

  async function fetchMoviesHandler() {
    //  console.log('calling api');
    console.log(id);
    //  clearInterval(id);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
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

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
   
      id=setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  }

const cancelHandler=()=>{
  console.log('cancel')
  clearInterval(id);
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>Found No movies</p>}
        {!isLoading && error && <p>{error} <button onClick={cancelHandler}>Cancel</button></p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;