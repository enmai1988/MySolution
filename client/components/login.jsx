import React from 'react';
import ReactDOM from 'react-dom';

const Login = () => (
  <div className="login">
    <h3 className="login_title">Welcome to MySolution</h3>
    <a className="login_github" href="/api/auth/facebook"><img src='assets/icon.png' width='48' height='48' style={{marginBottom: '8px'}}></img><br/>Sign in with Facebook</a>
  </div>
);

export default Login;
