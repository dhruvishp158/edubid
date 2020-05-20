import React, { useEffect, Fragment } from "react";
import "./css/test.css";
import NavBar from "./components/layout/navbar";
import LogIn from "./components/auth/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import GetAddress from "./components/profile/GetAddress";
import CreateProfile from "./components/profile/CreateProfile";
import Home from "./components/layout/Home";
import setAuthToken from "./components/utils/authToken";

//store
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layout/alert";
import { loadUser } from "./actions/auth";
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
                <Route exact path='/get-address' component={GetAddress} />
                <Route exact path='/create-profile' component={CreateProfile} />
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
