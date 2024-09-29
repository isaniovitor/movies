import MovieItem from "../movieItem/MovieItem";
import { Movie } from "../../@types/movie.js";
import "./styles.css";
import { useState } from "react";
import MovieDetails from "../details/MovieDetails";

type MoviesListProps = { movies: Movie[] };

export default function MoviesList({ movies }: MoviesListProps) {
  const [details, setDetails] = useState<Movie>({} as Movie);
  const moviesItems = movies.map((movie: Movie) => (
    <MovieItem key={movie.id} movie={movie} onClick={() => setDetails(movie)} />
  ));

  return (
    <>
      <div className="movies-list">{moviesItems}</div>
      <MovieDetails
        isOpen={details}
        onClose={() => {
          setDetails({} as Movie);
        }}
      />
    </>
  );
}
