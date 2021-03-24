const convertToLikeList = (files) => files
  .filter((like) => like.liked_by_user && like.id)
  .map((val) => val.id);

export default convertToLikeList;
