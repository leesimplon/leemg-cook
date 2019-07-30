import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


export default class AtelierAll extends Component {
  constructor(props) {
    super(props);
    this.state = { atelier: [] };
  }
  componentDidMount() {
    axios
      .get("https://leemg-cook.herokuapp.com/api/ateliers")
      .then(response => {
        console.log("Atelier tableau :", response.data);
        this.setState({ atelier: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  liste() {
    return (
      <div>
        {this.state.atelier.length > 0
          ? this.state.atelier.map(obj => {
              console.log(obj.titre);

              var a = "https://leemg-cook.herokuapp.com/atelier/" + obj.image;

              return (
                <div class="col s12 m7" key={obj._id}>
                <h4 class="header">{obj.title}</h4>
                <div className="card small">
                  <div className="card-image">
                    <img src={a} alt={obj.image} width="200px"/>
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <span className="card-title orange-text">
                        <p>{obj.description}</p>
                      </span>
                      
                      <p>
                        Date: {obj.date}
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Horaire de debut:{" "}
                        {obj.hour}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Durée:{" "}
                        {obj.duration}
                      </p>
                      <p>
                        Place disponible:{obj.dispo}
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Place reservé:{" "}
                        {obj.reserve}
                      </p>
                      <p>Prix: {obj.price} €</p>
                    </div>
                    <div class="card-action">
                      <button type="submit" className="btn  btn-light right"><Link to={"/inscription/"+obj._id}>S'inscrire</Link></button>
                    </div>
                  </div>
                </div>
                </div>
              );
            })
          : "Aucun Atelier"}
      </div>
    );
  }
  render() {
    return <div className="container">{this.liste()}</div>;
  }
}
