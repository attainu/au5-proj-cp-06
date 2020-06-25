import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import MyButton from '../../utils/MyButton';

import { likePost, unlikePost } from '../../Redux/ActionCreators';

const LikeButton = (props) => {
  const {
    user: { likes, authenticated },
    likePost,
    unlikePost,
    postId
  } = props;

  const likedPost = () => {
    if (likes && likes.find((like) => like.postId === postId)) return true;
    else return false;
  };

  const likePostHandler = () => {
    likePost(postId);
  };
  const unlikePostHandler = () => {
    unlikePost(postId);
  };
  const likeButton = !authenticated ? (
    <Link to='/signin'>
      <MyButton tip='Like'>
        <FavoriteBorder color='primary' />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip='Undo like' onClick={unlikePostHandler}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likePostHandler}>
      <FavoriteBorder color='primary' />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ likePost, unlikePost }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
