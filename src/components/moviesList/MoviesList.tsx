import MovieItem from "../movieItem/MovieItem";
import { Movie } from "../../@types/movie.js";
import "./styles.css";

type MoviesListProps = { movies: Movie[] };

export default function MoviesList({ movies }: MoviesListProps) {
  const moviesItems = movies.map((movie: Movie) => (
    <MovieItem key={movie.id} movie={movie} />
  ));

  return <div className="movies-list">{moviesItems}</div>;
}
