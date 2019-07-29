import React from 'react';
import { Link } from 'react-router-dom';
import {MDBAnimation} from 'mdbreact';
import './Home.css';


export default function Home() {
  return (
    <div className="bg">
       <center>
          <MDBAnimation type="fadeInDown" duration="3s" delay="3s">
              <p className="message">Centre de formation culinaire pour enfant à partir de 12ans<br></br>Des atéliers sont offertent également pour les 25 à 35ans</p>         
              <p className="message"><Link className="orange-text text-darken-3 inscri" to="/ateliers">Choisissez votre atélier ici</Link></p>       
          </MDBAnimation>
        </center>
     </div>
  );
}
