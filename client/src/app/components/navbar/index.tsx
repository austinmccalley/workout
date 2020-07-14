import * as React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as style from './navbar.css';

export interface NavbarProps {
  // Nothing
}

export interface NavbarState {
  // Nothing
}

export class Navbar extends React.Component<NavbarProps, NavbarState> {
  render() {
    return (
      <div className={style.nav}>
        <Router>
          <ul>
            <li>
              <h2>Workout</h2>
            </li>
            <li>
              <Link to="/about">
                <h5>About</h5>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <h5>Contact</h5>
              </Link>
            </li>
            <li>
              <Link to="/plans">
                <h5>Plans</h5>
              </Link>
            </li>
            <li className={style.right}>
              <Link to="/login">
                <h5>Login</h5>
              </Link>
            </li>
          </ul>
        </Router>
      </div>
    );
  }
}

export default Navbar;
