import React from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { Space, Tag, Rate } from 'antd';
import { MovieServiceConsumer } from '../movieServiceContext';
import './movie.scss';

let maxId = 1000000;

const minText = (text) => {
  if (text.length < 150) {
    return text;
  }
  let count = 0;
  const arr = text.split(' ');
  const arrWords = arr.reduce((acc, word) => {
    if (count < 150) {
      count += word.length;
      acc.push(word);
    }
    return acc;
  }, []);
  return `${arrWords.join(' ')}...`;
};

const colorRating = (num) => {
  let color = null;

  switch (true) {
    case num <= 3:
      color = '#E90000';
      break;
    case num <= 5:
      color = '#E97E00';
      break;
    case num <= 7:
      color = '#E9D100';
      break;
    default:
      color = '#66E900';
  }

  return color;
};
const parseDate = (num) => {
  if (!num) {
    return 'No date';
  }
  return format(new Date(num), 'MMMM dd, yyyy', { locale: enGB });
};

const gluingSrc = (img) => {
  if (!img) {
    return 'https://pojproject-spb.ru/design/clients/!pustycshka.jpg';
  }
  return `https://image.tmdb.org/t/p/original${img}`;
};

function Movie(props) {
  const {
    id,
    grade,
    name,
    date,
    description,
    poster,
    rating,
    updateGrade,
    addMovieListRating,
    isRated,
    genreIds,
  } = props;

  const currentRating = rating.toFixed(1);

  return (
    <li className="movieCard">
      <img className="imgMovie" src={gluingSrc(poster)} alt={name} />
      <div className="dataMovie">
        <div>
          <div className="header">
            <p className="name">{name}</p>
            <span
              className="rating"
              style={{ borderColor: colorRating(currentRating) }}
            >
              {currentRating}
            </span>
          </div>
          <p className="date">{parseDate(date)}</p>
          <Space size={[0, 8]} wrap className="tags">
            <MovieServiceConsumer>
              {(genres) => genres.map((el) => {
                  maxId += maxId + 1;
                  return genreIds.length !== 0 && genreIds.includes(el.id) ? (
                    <Tag key={el.name}>{el.name}</Tag>
                  ) : null;
                })}
            </MovieServiceConsumer>
          </Space>
          <p className="description">{minText(description)}</p>
        </div>
        <Rate
          allowHalf
          defaultValue={isRated ? localStorage.getItem(id) : grade}
          count={10}
          marginXXS={3}
          paddingXXS={3}
          className="rate"
          onChange={(value) => {
            updateGrade(value);
            addMovieListRating(props, value);
          }}
        />
      </div>
    </li>
  );
}

export default Movie;

Movie.defaultProps = {
  genreIds: [],
  grade: 0.0,
  poster: 'https://pojproject-spb.ru/design/clients/!pustycshka.jpg',
  updateGrade: null,
};
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  grade: PropTypes.string,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  poster: PropTypes.string,
  rating: PropTypes.number.isRequired,
  updateGrade: PropTypes.func,
  addMovieListRating: PropTypes.func.isRequired,

  isRated: PropTypes.bool.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
};
