import React, { useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { searchFiles } from '../actions';

export const useStyles = makeStyles(() => ({
  pagination: {
    margin: 30,
  },
}));

const PaginationBar = ({
  files,
  page,
  setPage,
  searchTerm,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchFiles({ query: searchTerm, page }));
  }, [page]);

  const changePage = (e) => {
    setPage(parseInt(e.target.innerText, 10));
  };

  return (
    <Pagination
      hideNextButton
      hidePrevButton
      className={classes.pagination}
      onChange={changePage}
      page={page}
      count={files.total_pages}
      size="large"
    />
  );
};

PaginationBar.propTypes = {
  files: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default PaginationBar;
