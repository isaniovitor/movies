const assetsUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
import "./styles.css";

export default function MovieItem({ movie }) {
  return (
    <div className="movie-item">
      <header className="movie-item-header">
        <img
          className="movie-item__poster"
          src={assetsUrl + movie.poster_path}
          alt=""
          draggable={false}
        />
        {/* {movie.featured && (
          <span className="movie-item__badge">Em destaque</span>
        )} */}
      </header>

      <div className="movie-item__title__container">
        <h4 className="movie-item__title" title={movie.title}>{movie.title}</h4>
      </div>
    </div>
  );
}
