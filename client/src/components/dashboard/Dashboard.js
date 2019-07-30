
import React, { Component } from "react"; 
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    const { cooker } = this.props.auth;
    return (
      <div className="dash">   
          <p className="flow-text grey-text text-darken-1 right">
            Bonjour, <b>{cooker.name.split(" ")[0]}</b><br/>
            Vous êtes connecté.
            <p>Cliquez sur les boutons pour effectuer vos opérations</p> 
          </p> 
             
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
        
      </div>     
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Dashboard);
