import MoviesList from "./components/moviesList/MoviesList.jsx";
import Filters from "./components/filters/Filters";
import { useEffect, useState } from "react";
import { Movie, MovieFilters } from "./@types/movie";
import popular from "./data/popular.json";
import topRated from "./data/top-rated.json";
import upcoming from "./data/upcoming.json";
import nowPlaying from "./data/now-playing.json";
import { removeDuplicateItems } from "./utils/utils";
import MovieDetails from "./components/details/MovieDetails";
import "./styles.css";

export const initialFilters = {
  search: "",
  genres: [],
  onlyFeatureds: false,
};

const moviesLists = [
  { name: "Popular", list: popular },
  { name: "Top rated", list: topRated },
  { name: "Upcoming", list: upcoming },
  { name: "Now playing", list: nowPlaying },
];

const uniqueArray: Movie[] = removeDuplicateItems([
  ...popular,
  ...topRated,
  ...upcoming,
  ...nowPlaying,
]);

export default function App() {
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | null>(null);
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);
  const [details, setDetails] = useState<Movie>({} as Movie);

  useEffect(() => {
    if (
      !filters.search &&
      !filters.onlyFeatureds &&
      filters.genres.length === 0
    ) {
      setFilteredMovies(null);
      return;
    }

    const searchQuery = filters.search.toLowerCase();

    // If no search query, allow all movies
    const newFilteredMovies = uniqueArray.filter((movie: Movie) => {
      const matchesSearch = searchQuery
        ? movie.title.toLowerCase().includes(searchQuery)
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

  const filteredMoviesContent = (
    <>
      {filteredMovies && filteredMovies.length > 0 ? (
        <MoviesList movies={filteredMovies} setDetails={setDetails} />
      ) : (
        <div className="empty-search">
          <img src="./no-results.png" alt="No results" />
          <span>No results!</span>
        </div>
      )}
    </>
  );

  return (
    <div className="App">
      <Filters setFilters={setFilters} filters={filters} />
      {filteredMovies ? (
        <>{filteredMoviesContent}</>
      ) : (
        <>
          {moviesLists.map((list) => (
            <MoviesList
              movies={list.list}
              name={list.name}
              setDetails={setDetails}
            />
          ))}
        </>
      )}

      <MovieDetails
        isOpen={details}
        onClose={() => {
          setDetails({} as Movie);
        }}
      />
    </div>
  );
}
