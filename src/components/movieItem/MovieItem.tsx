import { Movie } from "../../@types/movie";
import { assetsUrl } from "../../utils/constants";
import "./styles.css";

type MovieItemProps = {
  movie: Movie;
  onClick: () => void;
};

export default function MovieItem({ movie, onClick }: MovieItemProps) {
  return (
    <div className="movie-item" onClick={onClick}>
      <header className="movie-item-header">
        <img
          className="movie-item__poster"
          src={assetsUrl + movie.poster_path}
          alt=""
          draggable={false}
        />
      </header>

      {movie.featured && <span className="movie-item__badge">Em destaque</span>}

      <div className="movie-item__title__container">
        <h4 className="movie-item__title" title={movie.title}>
          {movie.title}
        </h4>
      </div>
    </div>
  );
}
