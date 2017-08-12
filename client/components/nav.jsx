import React from 'react';
import ReactDOM from 'react-dom';

const Nav = ({statistic, user}) => (
  <nav className="navbar navbar-default navbar-inverse">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">MySolution</a>
      <div className="dropdown navbar-right">
        <div className="dropdown-toggle navbar-profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <img src={user.avatarUrl} />
        </div>
        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
          <li><a href="/api/logout">Logout</a></li>
        </ul>
      </div>

    </div>
  </nav>
);

export default Nav;
