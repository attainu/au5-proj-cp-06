import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Copyright from '../components/layouts/Copyright';
import { loginUser } from '../Redux/ActionCreators';

// ! TODO make usestyles global FIX
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
    textAlign: 'center'
  }
}));

function SignIn(props) {
  const {
    history,
    loginUser,
    UI: { loading, errors }
  } = props;

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors1, setErrors1] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    loginUser(userData, history);
  };
  useEffect(() => {
    let updated = true;
    if (updated) {
      setErrors1({ ...errors });
    }
    // * Cleanup function
    return () => {
      updated = false;
    };
  }, [errors]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component='h1' variant='h5' className={classes.pageTitle}>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors1.email}
            error={errors1.email ? true : false}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors1.password}
            error={errors1.password ? true : false}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          {errors1.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors1.general}
            </Typography>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Sign In
            {
              // ! TODO add a css animation for loading
              loading && (
                <CircularProgress size={30} className={classes.progress} />
              )
            }
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgotpassword' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {"Don't have an account? Sign Up "}
              <Link to='/signup' variant='body2'>
                {'here'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

SignIn.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
