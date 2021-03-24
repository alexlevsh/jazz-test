import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ThumbDown from '@material-ui/icons/AccountCircle';
import {
  IconButton, Button, Typography, Toolbar, AppBar,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { isAuth } from '../actions';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonsBar({ auth }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reqHandleClick = () => {
    window.location.href = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_ACCESS}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
  };

  const buttonHandleClick = () => {
    localStorage.removeItem('token');
    dispatch(isAuth(false));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photo Searcher App
          </Typography>
          {
           auth
             ? (
               <IconButton>
                 <ThumbDown />
               </IconButton>
             )
             : (
               <Button
                 color="inherit"
                 onClick={() => reqHandleClick()}
               >
                 Login
               </Button>
             )
          }
          <Button
            color="inherit"
            onClick={buttonHandleClick}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonsBar.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default ButtonsBar;
