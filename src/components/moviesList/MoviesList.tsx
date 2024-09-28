import MovieItem from "../movieItem/MovieItem.tsx";
import movies from "../../data/popular.json";
import "./styles.css";
import { Movie } from "../../@types/movie.js";

export default function MoviesList() {
  const moviesItems = movies.map((movie: Movie, index: number) => (
    <MovieItem key={movie.id} movie={movie} />
  ));

  return <div className="movies-list">{moviesItems}</div>;
}
