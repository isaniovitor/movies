import "./styles.css";
import MoviesList from "./components/moviesList/MoviesList.jsx";
import Filters from "./components/filters/Filters";
import { useEffect, useState } from "react";
import { Movie, MovieFilters } from "./@types/movie";
import movies from "./data/popular.json";

export const initialFilters = {
  search: "",
  genres: [],
  onlyFeatureds: false,
};

export default function App() {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);

  useEffect(() => {
    if (
      !filters.search &&
      !filters.onlyFeatureds &&
      filters.genres.length === 0
    ) {
      setFilteredMovies(movies);
      return;
    }

    const searchQuery = filters.search.toLowerCase();

    // If no search query, allow all movies
    const newFilteredMovies = movies.filter((movie: Movie) => {
      const matchesSearch = searchQuery
        ? movie.original_title.toLowerCase().includes(searchQuery)
        : true;

      // If no genre filters, allow all movies
      const matchesGenres = filters.genres.length
        ? filters.genres.some((id) => movie.genre_ids.includes(id))
        : true;

      // If no filterd by featureds, allow all movies
      const matchesFeatureds = filters.onlyFeatureds ? movie.featured : true;

      return matchesSearch && matchesGenres && matchesFeatureds;
    });

    setFilteredMovies(newFilteredMovies);
  }, [filters]);

  return (
    <div className="App">
      <Filters setFilters={setFilters} filters={filters} />
      {filteredMovies.length > 0 ? (
        <MoviesList movies={filteredMovies} />
      ) : (
        <div className="empty-search">
          <img src="./no-results.png" alt="No results" />
          <span>No results!</span>
        </div>
      )}

      {/* <MoviesList movies={populars}, genre={"Populars"} />
<MoviesList movies={filteredMovies} /> */}
    </div>
  );
}
