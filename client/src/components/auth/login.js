import React from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

function LogIn() {
  const fade = useSpring({ opacity: 1, color: "red" });
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userName);
    console.log(password);
  }

  return (
    <div className='forGrid'>
      <animated.div className='ab' style={{ fade }}>
        <h1 style={{ fontSize: "2rem" }}>LogIn</h1>

        <form
          className='loginForm'
          style={{ padding: "2rem" }}
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter your Email'
            onChange={(e) => {
              console.log(e.target.value);
              setUserName(e.target.value);
            }}
          />
          <input
            type='text'
            name='password'
            id='password'
            placeholder='Enter your Password'
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
          />
          <input type='submit' value='LogIn' />
          <p>
            First time visit?{" "}
            <Link to='/SignUp' style={{ color: "green" }}>
              SignUp
            </Link>
          </p>
        </form>
      </animated.div>
    </div>
  );
}

export default LogIn;
