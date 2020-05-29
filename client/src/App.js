import React, { useEffect, Fragment } from "react";
import "./css/test.css";
import NavBar from "./components/layout/navbar";
import LogIn from "./components/auth/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import GetAddress from "./components/profile-forms/GetAddress";
import Home from "./components/layout/Home";
import setAuthToken from "./components/utils/authToken";

//storeofile
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layout/alert";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CreateProfileForm from "./components/profile-forms/CreateProfileForm";
import UpdateProfile from "./components/profile-forms/UpdateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Chat from "./components/chat/Chat";
// ===========================================================================================

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='forWidth'>
            <section className='main'>
              <NavBar />
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/LogIn' component={LogIn} />
                <Route exact path='/SignUp' component={SignUp} />
                <Route exact path='/profile/:id' component={Profile} />
                <Route exact path='/chat' component={Chat} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfileForm}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={UpdateProfile}
                />
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />

                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <Route exact path='/get-address' component={GetAddress} />
              </Switch>

              {/* <LogIn /> */}
            </section>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
