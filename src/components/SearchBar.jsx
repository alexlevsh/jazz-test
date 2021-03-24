import React, { useEffect, useState } from 'react';
import { TextField, ButtonBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'react-use-localstorage';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { searchFiles } from '../actions';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 15,
    width: '70%',
  },
  button: {
    padding: '18px 30px 6px 30px',
    margin: '8px 0 0 -4px',
    color: 'rgba(255, 255, 255, 255)',
    background: 'rgba(63, 80, 181, 1)',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  search: {
    width: '100%',
  },
  icon: {
    paddingBottom: 8,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SearchBar({
  setSearchTerm,
  searchTerm,
  setPage,
  page,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchList, setSearchList] = useLocalStorage('searchHistory', null);
  const search = JSON.parse(searchList) || [];

  useEffect(() => {
    const results = search
      .slice(-5)
      .reverse();
    setSearchResults(results);
  }, [searchTerm, searchList]);

  const inputHandleOnInputChange = (e) => {
    const value = e.target.value || e.target.innerText;
    setSearchTerm(value);
  };

  const buttonHandleClick = () => {
    if (searchTerm.length) {
      setPage(1);
      dispatch(searchFiles({ query: searchTerm, page }));
      setSearchList(JSON.stringify(Array.from(new Set([...search, searchTerm]))));
    }
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.search}
        freeSolo
        disableClearable
        onInputChange={inputHandleOnInputChange}
        value={searchTerm}
        options={searchResults.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Photo search"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      <ButtonBase
        className={classes.button}
        onClick={buttonHandleClick}
      >
        <SearchIcon className={classes.icon} />
      </ButtonBase>
    </div>

  );
}

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchBar;
