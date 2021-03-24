import React, { useEffect, useState } from 'react';
import 'reset-css';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authUser } from '../actions';
import ImgsGrid from './ImgsGrid';
import ButtonsBar from './ButtonsBar';
import SearchBar from './SearchBar';
import PaginationBar from './PaginationBar';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const auth = useSelector((state) => state.root.auth);
  const files = useSelector((state) => state.root.files);
  const loading = useSelector((state) => state.root.loading);
  const likesList = useSelector((state) => state.root.likes);

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <>
      <ButtonsBar auth={auth} />
      {auth
        ? (
          <div className={classes.container}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setPage={setPage}
              page={page}
            />
            <ImgsGrid
              files={files}
              loading={loading}
              likesList={likesList}
            />
            {
            files.results
            && (
            <PaginationBar
              files={files}
              searchTerm={searchTerm}
              page={page}
              setPage={setPage}
            />
            )
}
          </div>
        )
        : (
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" className={classes.paper}>
              Please Login
            </Typography>
          </Grid>
        )}
    </>
  );
}

export default App;
