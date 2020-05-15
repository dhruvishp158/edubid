import React from "react";
function SignUp() {
  return (
    <div className='forGrid'>
      <div className='ab'>
        <h1 style={{ fontSize: "2rem" }}>Sign up</h1>
        <form className='loginForm' style={{ padding: "2rem" }}>
          <input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='Enter your first name'
          />
          <input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Enter your last name'
          />

          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter your Email'
          />
          <input
            type='text'
            name='password'
            id='password'
            placeholder='Enter your Password'
          />

          <input type='submit' value='Sign Up' />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
