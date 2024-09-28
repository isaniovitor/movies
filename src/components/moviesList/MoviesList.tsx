import MovieItem from "../movieItem/MovieItem.tsx";
import movies from "../../data/popular.json";
import "./styles.css";

export default function MoviesList() {
  const moviesItems = movies.map((movie, index) => (
    <MovieItem key={movie.id} movie={movie} />
  ));

  return <div className="movies-list">{moviesItems}</div>;
}
