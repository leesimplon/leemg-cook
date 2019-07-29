import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Sidenav extends Component {
  render() {
    return (
      <nav className="navside">
        <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/ateliers">Ateliers</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/login">Espace cuisinier</Link>
              </li>
          </ul>
      </nav>
    )
  }
}
