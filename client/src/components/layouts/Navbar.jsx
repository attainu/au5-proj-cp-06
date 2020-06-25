import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';

import { logoutUser } from '../../Redux/ActionCreators';
import PostPost from '../posts/PostPost';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = ({ authenticated, logoutUser }) => {
  const classes = useStyles();

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className='nav-container'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          {authenticated ? (
            <>
              <Typography variant='h6' className={classes.title}>
                <Button color='inherit' component={Link} to='/'>
                  Chirper
                  <HomeIcon />
                </Button>
              </Typography>
              <PostPost />
              <Notifications />
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant='h6' className={classes.title}>
                <Button color='inherit' component={Link} to='/'>
                  FakeBook
                </Button>
              </Typography>
              <Button color='inherit' component={Link} to='/signin'>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logoutUser }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
