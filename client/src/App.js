import React from "react";
import "./css/test.css";
import NavBar from "./components/layout/navbar";
import LogIn from "./components/auth/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/auth/signUp";
import GetAddress from "./components/profile/GetAddress";
import CreateProfile from "./components/profile/CreateProfile";
// ===========================================================================================
function App() {
  return (
    <BrowserRouter>
      <div className='forWidth'>
        <div className='main'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={LogIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/get-address' component={GetAddress} />
            <Route path='/create-profile' component={CreateProfile} />
          </Switch>

          {/* <LogIn /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
