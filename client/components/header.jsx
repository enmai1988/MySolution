import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({onlineUsers, user}) => {

  let waitTime = null;
  let welcome = null;

  if (user) {
    waitTime = Math.floor((onlineUsers.waitTime) / 1000 / 60);
  }

  if (user && (user.role === 'admin' || user.role === 'mentor')) {
    welcome =
      <h4>
        There are currently
        <span> {onlineUsers.mentor} mentors</span> and
        <span> {onlineUsers.student} students</span> online,
        and the estimated wait time is <span>{onlineUsers.waitTime} minutes</span>.
      </h4>;
  }

  if (user && user.role === 'student') {
    welcome =
      <h4>
        The estimated wait time is <span>{onlineUsers.waitTime} minutes</span>.
      </h4>;
  }

  return (
    <div className="page_header">
      <div className="container">
        <h3>Welcome back {user.firstName}!</h3>
        {welcome}
      </div>
    </div>
  );
};

export default Header;
