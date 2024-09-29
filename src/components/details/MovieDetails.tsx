import Modal from "../modal/Modal";
import { Movie } from "../../@types/movie";
import { assetsUrl } from "../../utils/constants";
import genres from "../../data/genres.json";
import { Genre } from "../../@types/genre";
import "./styles.css";

type MovieDetailsProps = {
  isOpen: Movie;
  onClose: () => void;
};

export default function MovieDetails({
  isOpen: movie,
  onClose,
}: MovieDetailsProps) {
  const currentGenres: string[] = genres
    .filter(({ id }: Genre) => movie?.genre_ids?.includes(id))
    .map((genre: Genre) => genre.name);

  return (
    <Modal isOpen={!!movie.id} onClose={onClose}>
      <div className="movie-details-item">
        <img
          className="movie-details__poster"
          src={assetsUrl + movie.backdrop_path}
          alt=""
          draggable={false}
        />

        <article>
          <div className="movie-details__title__wrapper">
            <h4 className="movie-details__title" title={movie.title}>
              {movie.title}
            </h4>

            <span className="movie-details__rating">
              {movie.vote_average?.toFixed(1)} &#11088;
            </span>
          </div>

          <p className="movie-details__information">
            {movie.adult && (
              <span className="movie-details__maturity-rating">18</span>
            )}

            <span>popularity: {movie.popularity}</span>
            <span className="movie-details__release">
              release: {movie.release_date}
            </span>
          </p>

          <p className="movie-details__overview" title={movie.overview}>
            {movie.overview}
          </p>

          <p className="movie-details__genres">
            {currentGenres?.map((genre) => (
              <span>{genre}</span>
            ))}
          </p>
        </article>
      </div>
    </Modal>
  );
}
