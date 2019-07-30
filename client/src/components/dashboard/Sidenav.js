import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Sidenav extends Component {
  render() {
    const { cooker } = this.props.auth;
    return (
      <nav className="navside">
         
      <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/ajout-atelier/" + cooker.id} className="btn btn-light">
                  Ajouter un atelier
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/mes-ateliers/" + cooker.id} className="btn btn-light">
                  Voir mes atelier
              </Link>
            </li>
        </ul>
    </nav>
    )
  }
}

Sidenav.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Sidenav);