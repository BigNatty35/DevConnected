import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; // Allows for custom routes in the app
// Browser as Route allow to use the word Router to wrap the function
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';

//Check to see if there is a current user/token
if(localStorage.jwtToken) {
  //if there is a current user, put token in header.
  setAuthToken(localStorage.jwtToken);
  // decode token to get user info and exipiration.
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  //If user token has expired
  const currentTime = Date.now() / 1000;
  //if time has run out then logout the user.
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
  //TODO: Clear current user

  // redirect to login
  
}

/* The Provider passes the store(app state) to all components*/ 
/*Router allows the components to have different routes specified by 'Route'*/
class App extends Component {
  render() {
    return (
    <Provider store={store}> 
        <Router> 
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router >
      </Provider>
    );
  }
}



export default App;
