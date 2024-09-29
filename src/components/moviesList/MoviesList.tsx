import MovieItem from "../movieItem/MovieItem";
import { Movie } from "../../@types/movie.js";
import { Dispatch } from "react";
import "./styles.css";

type MoviesListProps = {
  movies: Movie[];
  name?: string;
  setDetails: Dispatch<React.SetStateAction<Movie>>;
};

export default function MoviesList({
  movies,
  name,
  setDetails,
}: MoviesListProps) {
  const moviesItems = movies.map((movie: Movie) => (
    <MovieItem key={movie.id} movie={movie} onClick={() => setDetails(movie)} />
  ));

  return (
    <>
      {name && <h1 className="movies-list-name">{name}</h1>}
      <div className="movies-list">{moviesItems}</div>
    </>
  );
}
