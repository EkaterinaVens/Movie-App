import React from 'react';
import Header from '../header/header';
import MovieList from '../movieList/movieList';
import MovieService from '../../services/movieService';
import Spinner from '../spinner';
import './app.scss';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
      count: null,
      name: 'people',
      guestSession: null,
      grade: 0.0,
      isRated: false,
      countLocalMovies: 0,
      genres: [],
    };
    this.getMovies();
  }

  async componentDidMount() {
    localStorage.clear();
    const res = await MovieService.createSession();
    const gen = await MovieService.getGenres();

    this.setState({
      guestSession: res.guest_session_id,
      genres: gen.genres,
    });
  }

  componentDidUpdate(props, state) {
    const { name } = this.state;
    if (state.name !== name) {
      this.getMovies(name, 1);
    }
  }

  updateData = (value) => {
    this.setState({ name: value });
  };

  updateRated = (value) => {
    this.setState({ isRated: value });
  };

  updateGrade = (value) => {
    this.setState({ grade: value });
  };

  addMovieListRating = async ({ id }, value) => {
    const { guestSession, movies, countLocalMovies } = this.state;
    const movieObj = movies.filter((movie) => movie.id === id);
    const currentLocalMovie = JSON.parse(localStorage.getItem('moviesLocal'));
    localStorage.setItem(id, value);

    localStorage.getItem(id);

    if (!currentLocalMovie) {
      localStorage.setItem('moviesLocal', JSON.stringify(movieObj));

      this.setState({ countLocalMovies: 1 });
    } else {
      const individLocalMovies = currentLocalMovie.filter(
        (movie) => movie.id !== id,
      );
      localStorage.setItem(
        'moviesLocal',
        JSON.stringify(movieObj.concat(individLocalMovies)),
      );
      this.setState({ countLocalMovies: countLocalMovies + 1 });
    }

    await MovieService.addRating(id, guestSession);
  };

  getRatedMovies = async () => {
    const { guestSession } = this.state;

    await MovieService.getRatesMovies(guestSession);
  };

  onChangePage = (num) => {
    const { name } = this.state;
    this.getMovies(name, num);
  };

  getMovies = async (name = 'people', num = 1) => {
    // const { movies } = this.state;
    await MovieService.getMovies(name, num).then(({ items, count }) => {
      this.setState(() => {
        const newArr = items.map((movie) => ({
          key: movie.id,
          id: movie.id,
          name: movie.title,
          date: movie.release_date,
          description: movie.overview,
          poster: movie.poster_path,
          rating: movie.vote_average,
          grade: null,
          genreIds: movie.genre_ids,
        }));

        return {
          movies: count ? newArr : null,
          loading: false,
          count,
        };
      });
    });
  };

  render() {
    const {
      movies,
      loading,
      count,
      name,
      isRated,
      countLocalMovies,
      genres,
      grade,
    } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
      <MovieList
        movies={
          isRated ? JSON.parse(localStorage.getItem('moviesLocal')) : movies
        }
        onChangePage={this.onChangePage}
        count={count}
        updateGrade={this.updateGrade}
        addMovieListRating={this.addMovieListRating}
        isRated={isRated}
        countLocalMovies={countLocalMovies}
        genres={genres}
        grade={grade}
      />
    ) : null;
    return (
      <div>
        {navigator.onLine ? (
          <>
            <Header
              search={this.getMovies}
              updateData={this.updateData}
              value={name}
              onChange={this.debouncedGetMovies}
              getRatedMovies={this.getRatedMovies}
              updateRated={this.updateRated}
              isRated={isRated}
            />
            {spinner}
            {content}
          </>
        ) : (
          alert('Сейчас вы не в сети. Проверьте свое соединение.')
        )}
      </div>
    );
  }
}
