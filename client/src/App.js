import React from 'react';
import { Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import NavBar from './components/layouts/Navbar';
import User from './Pages/User';

import AuthRoute from './utils/AuthRoute';

import { SET_AUTHENTICATED } from './Redux/ActionCreators/Types';
import { logoutUser, getUserData } from './Redux/ActionCreators';
import store from './Redux/Reducers';

import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';

const theme = createMuiTheme(themeFile);

// !actual API
axios.defaults.baseURL =
  'https://us-central1-fakebook-3d144.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/signin';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <div className='container'>
        <Switch>
          <Route path='/' component={Home} exact />
          <AuthRoute path='/signup' component={SignUp} exact />
          <AuthRoute path='/signin' component={SignIn} exact />
          <Route exact path='/users/:handle' component={User} />
          <Route exact path='/users/:handle/post/:postId' component={User} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
