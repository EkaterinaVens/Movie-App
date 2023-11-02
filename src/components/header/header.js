// eslint-disable-next-line no-unused-vars
import React from 'react';
// import TabsHeader from '../tabs';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Tabs, Input } from 'antd';
import './header.css';

function Header(props) {
  const { updateData, getRatedMovies, updateRated } = props;
  const onChange = (key) => {
    if (key === '2') {
      updateRated(true);
      getRatedMovies();
    } else {
      updateRated(false);
    }
  };

  const currentValue = (event) => {
    event.stopPropagation();
    event.preventDefault();
    updateData(event.target.value);
  };
  const debouncedGetMovies = debounce(currentValue, 800);

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <Input placeholder="Type to search..." onKeyUp={debouncedGetMovies} />
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: null,
      onclick: { getRatedMovies },
    },
  ];
  return (
    <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
  );
}

Header.propTypes = {
  updateData: PropTypes.func.isRequired,
  getRatedMovies: PropTypes.func.isRequired,
  updateRated: PropTypes.func.isRequired,
};

export default Header;
