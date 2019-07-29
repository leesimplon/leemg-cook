
// export default NavbarPage;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutCooker } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import './Navbar.css';
import logo from "./logo.png";

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutCooker(this.props.history);
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <div className="navbar-nav ml-auto">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Mon espace cuisinier</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={this.onLogout.bind(this)}>
                                <i className="fas fa-user-circle text-info mr-1" />Se deconnecter
                            </Link>
                        </li>
                    </ul>
            </div>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/ateliers">Ateliers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Espace cuisinier</Link>
            </li>
        </ul>
      )
        return(
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/"><img src={logo} alt="Atelier-Cuisine" className="navbar-brand" /></Link> <h1>Cuisinons</h1>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutCooker: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutCooker })(withRouter(Navbar));