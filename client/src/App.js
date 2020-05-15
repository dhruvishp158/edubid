import React from "react";
import "./css/test.css";
import NavBar from "./components/layout/navbar";
import LogIn from "./components/auth/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./components/auth/signUp";
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
          </Switch>

          {/* <LogIn /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
