import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Getatelier.css';


export default class AtelierCuisinier extends Component {

    constructor(props) {
        super(props);
        this.state = { atelier: [] };

    }
    componentDidMount() {
        axios.get('https://leemg-cook.herokuapp.com/api/ateliercook/'+this.props.match.params.cookerId)
            .then(response => {
                console.log('Atelier tableau :', response.data)
                this.setState({ atelier: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    liste() {
        return <div>
            <div className="table-responsive">
            <Link to="/dashboard"><p>Retour au dashboard</p></Link>
                    <h4>Mes atéliers</h4>
                <table className="table table-striped table-bordered" id="table">
                    <thead>
                        <tr>
                           
                            <th className="thtab">Titre</th>
                            <th className="thtab">Description</th>
                            <th className="thtab">Date</th>
                            <th className="thtab">horaire de debut</th>
                            <th className="thtab">Durée</th>
                            <th className="thtab">place disponible</th>
                            <th className="thtab">place reservé</th>
                            <th className="thtab">Prix</th>
                            <th className="thtab">Image</th>
                            <th className="thtab">Visibiblité</th>
                            <th className="thtab">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.atelier.length > 0) ? (this.state.atelier.map((obj) => {
                                var a = "https://leemg-cook.herokuapp.com/atelier/"+obj.image
                                return <tr key={obj._id}>
                                   
                                    <td>{obj.title}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.date}</td>
                                    <td>{obj.hour}</td>
                                    <td>{obj.duration}</td>
                                    <td>{obj.dispo}</td>
                                    <td>{obj.reserve}</td>
                                    <td>{obj.price}€</td>
                                    <td><img id="imagetab" width="100px" height="90px" src={a} alt={obj.image}/></td>
                                    <td>{obj.visible?"activé":"désactivé"}</td>
                                    <td>
                                    <Link to={"/modifier-atelier/" + obj._id} className="btn btn-light">Modifier</Link></td>
                                    
                                </tr>
                            })) : ('Aucun Atelier')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}