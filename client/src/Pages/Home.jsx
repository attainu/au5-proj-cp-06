import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid } from '@material-ui/core';

import Post from '../components/posts/Post';
import Profile from '../components/profile/Profile';
import { getPosts } from '../Redux/ActionCreators';
import PostSkeleton from '../utils/PostSkeleton';

const Home = (props) => {
  const {
    getPosts,
    data: { posts, loading }
  } = props;

  useEffect(() => {
    let mounted = true;
    if (mounted) getPosts();
    return () => {
      mounted = false;
    };
  }, [getPosts]);

  let recentPostMarkup = !loading ? (
    posts.map((post) => <Post post={post} key={post.postId} />)
  ) : (
    <PostSkeleton />
  );
  return (
    <Grid container spacing={5}>
      <Grid item sm={8} xs={12}>
        {recentPostMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
