import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Copyright from '../components/layouts/Copyright';
import { signupUser } from '../Redux/ActionCreators';

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

const SignUp = (props) => {
  const {
    history,
    signupUser,
    UI: { loading, errors }
  } = props;
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [errors1, setErrors1] = useState({});

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    signupUser(newUserData, history);
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
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={errors1.email}
                error={errors1.email ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                helperText={errors1.confirmPassword}
                error={errors1.confirmPassword ? true : false}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='handle'
                label='Handle'
                id='handle'
                autoComplete='handle'
                value={handle}
                helperText={errors1.handle}
                error={errors1.handle ? true : false}
                onChange={(e) => setHandle(e.target.value)}
              />
            </Grid>
          </Grid>
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
            Sign Up
            {
              // ! TODO add a css animation for loading
              loading && (
                <CircularProgress size={30} className={classes.progress} />
              )
            }
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              {'Already have an account? '}
              <Link to='/signin' variant='body2'>
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signupUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
