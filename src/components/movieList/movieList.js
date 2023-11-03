import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import Movie from '../movie/movie';

import './movieList.scss';

let text = '';
function MovieList(props) {
  const {
    movies,
    onChangePage,
    count,
    updateGrade,
    addMovieListRating,
    isRated,
    countLocalMovies,
    genres,
  } = props;

  text = !isRated ? (
    <p>Напишите название фильма</p>
  ) : (
    <p>Вы ещё не оценивали фильмы</p>
  );

  return (
    <>
      <ul className="movieList">
        {!movies
          ? text
          : movies.map((movie) => (
              <Movie
                {...movie}
                updateGrade={updateGrade}
                addMovieListRating={addMovieListRating}
                isRated={isRated}
                genres={genres}
              />
            ))}
      </ul>
      <div className="paginator">
        <Pagination
          onChange={(page) => {
            onChangePage(page);
          }}
          defaultCurrent={1}
          total={isRated ? countLocalMovies || 1 : count}
          defaultPageSize={20}
          showSizeChanger={false}
          itemActiveBg="#1890FF"
          itemActiveBgDisabled="#1890FF"
          hideOnSinglePage
        />
      </div>
    </>
  );
}

MovieList.defaultProps = {
  movies: [],
  count: null,
  isRated: false,
  countLocalMovies: 0,
  genres: null,
};
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string,
      rating: PropTypes.number.isRequired,
    }),
  ),
  onChangePage: PropTypes.func.isRequired,
  count: PropTypes.number,

  updateGrade: PropTypes.func.isRequired,
  addMovieListRating: PropTypes.func.isRequired,
  isRated: PropTypes.bool,
  countLocalMovies: PropTypes.number,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};
export default MovieList;
