import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";
const FooterPage = () => {
  return (
      <div className="conatainer">
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">À propos</h5>
                <p className="white-text text-lighten-3">Centre de formation pour enfants à
              partir de 12 ans</p>
                <p className="white-text text-lighten-3">Nous avons lancé cette application pour permettre aux particuliers de 25 à 35 ans de s'inscrire à nos atéliers.</p> 
                <p className="white-text text-lighten-3">Non seulement vous aurez des bonnes connaissances en art culinaires, mais aussi votre inscription contribuera à booster notre activité.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Liens pour mobiles</h5>
                <ul>
                  <li><Link className="white-text text-lighten-3" to="/ateliers">Les ateliers</Link></li>
                  <li><Link className="white-text text-lighten-3" to="/login">Espace cuisinier</Link></li>
                  <li><Link className="white-text text-lighten-3" to="/dashboard">Administration sécurisée</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
             Tous droits résérvés © 2019 <a className="grey-text text-lighten-4" href="mailto:rlee.andri@gmail.com">Lee ANDRIAMAHOLISON</a>
            <p className="grey-text text-lighten-4 right" >* pour test de l'appli, enregistrer cuisinier au 'lien_du_site/register'</p>
            </div>
          </div>
        </footer>
        </div>    
   
  );
};

export default FooterPage;
