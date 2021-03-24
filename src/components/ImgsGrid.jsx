import React from 'react';
import { useDispatch } from 'react-redux';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { likePhoto, disLikePhoto } from '../actions';

export const useStyles = makeStyles(() => ({
  loading: {
    padding: 40,
  },
  root: {
    width: '80%',
    minHeight: 250,
    paddingTop: 10,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const ImgsGrid = ({
  files,
  loading,
  likesList,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const iconHandleLike = (id) => {
    dispatch(likePhoto(id));
  };

  const iconHandleDislike = (id) => {
    dispatch(disLikePhoto(id));
  };

  return (
    <>
      {
          loading ? <CircularProgress className={classes.loading} />
            : (
              <GridList cellHeight={300} spacing={30} className={classes.root}>
                {files.results && files.results.map((img) => (
                  <GridListTile key={img.id}>
                    <img src={img.urls.regular} alt={img.alt_description} />
                    <GridListTileBar
                      title={img.alt_description}
                      actionIcon={
                        likesList.includes(img.id)
                          ? (
                            <IconButton
                              onClick={() => iconHandleDislike(img.id)}
                              aria-label={`info about ${img.alt_description}`}
                              className={classes.icon}
                            >
                              <ThumbDown />
                            </IconButton>
                          )
                          : (
                            <IconButton
                              aria-label={`info about ${img.alt_description}`}
                              className={classes.icon}
                              onClick={() => iconHandleLike(img.id)}
                            >
                              <ThumbUp />
                            </IconButton>
                          )
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            )
        }
    </>
  );
};

ImgsGrid.propTypes = {
  files: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  likesList: PropTypes.instanceOf(Array).isRequired,
};

export default ImgsGrid;
