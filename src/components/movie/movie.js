// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { Space, Tag, Rate } from 'antd';
import './movie.css';
// import { defaultProps } from 'react-detect-offline';

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
    name,
    date,
    description,
    poster,
    rating,
    updateGrade,
    addMovieListRating,
    grade,
    isRated,
    genreIds,
    genres,
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
            {genres.map((el) => {
              maxId += maxId + 1;

              return genreIds.length !== 0 && genreIds.includes(el.id) ? (
                <Tag key={el.name}>{el.name}</Tag>
              ) : null;
            })}
          </Space>
          <p className="description">{minText(description)}</p>
        </div>
        <Rate
          allowHalf
          defaultValue={isRated ? grade : 0}
          count={10}
          className="rate"
          onChange={(value) => {
            updateGrade(value);
            addMovieListRating(props);
          }}
        />
      </div>
    </li>
  );
}

export default Movie;

Movie.defaultProps = {
  genreIds: [],
  genres: [],
  grade: 0.0,
  poster: 'https://pojproject-spb.ru/design/clients/!pustycshka.jpg',
  updateGrade: null,
};
Movie.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  poster: PropTypes.string,
  rating: PropTypes.number.isRequired,
  updateGrade: PropTypes.func,
  addMovieListRating: PropTypes.func.isRequired,
  grade: PropTypes.number,
  isRated: PropTypes.bool.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};
