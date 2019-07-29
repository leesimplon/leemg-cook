import React, { Component } from 'react'
import axios from 'axios';
import { MDBCol,MDBInput,MDBCard, MDBCardBody} from "mdbreact";
import { Link } from 'react-router-dom';

export default class AtelierEdit extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          atelier:[]
        };       

        this.onChange = this.onChange.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this);
        console.log(props);
      }
    
    
      componentDidMount() {
        axios.get('http://localhost:8080/api/atelier/' + this.props.match.params.atelierId)
          .then(response => {
            console.log('i am a response', response)
            this.setState({ titre: response.data.title });
            this.setState({ desc: response.data.description });
            this.setState({ dat: response.data.date });
            this.setState({ heure: response.data.hour });
            this.setState({ dure: response.data.duration });
            this.setState({ disp: response.data.dispo });
            this.setState({ resa: response.data.reserve });
            this.setState({ dure: response.data.duration });
            this.setState({ prix: response.data.price });
            this.setState({ actif: response.data.visible });
          })
          .catch(function (error) {
            console.log(error);
          })
      }

      onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
      handleUploadImage(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('image', this.uploadInput.files[0]);
        data.append('title',this.state.title);
        data.append('description',this.state.description);
        data.append('date',this.state.date);
        data.append('hour',this.state.hour);
        data.append('duration',this.state.duration);
        data.append('dispo',this.state.dispo);
        data.append('reserve',this.state.reserve||0);
        data.append('price',this.state.price);
        data.append('visible',this.state.visible);
        
        fetch('http://localhost:8080/api/ateliers/'+ this.props.match.params.atelierId, {
          method: 'PUT',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
            this.setState({ image: `http://localhost:8080/api/ateliers/${body.image}` });
            
          });
        });
      }
    
      render() {
        return (
            <div className="formatelier container"> 
            
            <MDBCol md="12">
                <MDBCard width="100%">
                  <MDBCardBody>
                    <form  onSubmit={this.handleUploadImage}>
                    <Link to="/dashboard"><p>Retour</p></Link>
                      <p className="h4 text-center py-4">Modifier un atelier </p>

                      <div className="orange-text">
                        <MDBInput
                          className="champs"
                          label={this.state.titre}
                          group
                          type="text"
                          error="incorrecte"
                          required="false"
                          placeholder="haha"
                          success="bien" value={this.state.value}  onChange={this.onChange} name="title"
                        />
                        <MDBInput
                        className="champs"
                          label="Déscription"
                          group
                          type="textarea"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.desc}
                          success="bien" value={this.state.value} onChange={this.onChange} name="description"
                        />
                        <MDBInput
                        className="champs"
                          label="Date"
                          group
                          type="date"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.dat}
                          success="bien" value={this.state.value} onChange={this.onChange} name="date"
                        />
                         <MDBInput
                         className="champs"
                          label="Horaire début"
                          group
                          type="time"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.heure}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="hour"
                        />
                         <MDBInput
                         className="champs"
                          label="Durée"
                          group
                          type="text"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.dure}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="duration"
                        />
                         <MDBInput
                         className="champs"
                          label="Nombre de place disponible"
                          group
                          type="number"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.disp}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="dispo"
                        />
    
                        <MDBInput
                         className="champs"
                          label="Nombre de place résérvé(s)"
                          group
                          type="number"
                          max={this.state.dispo}
                          required="false"
                          validate
                          error="incorrecte"
                          placeholder={this.state.resa}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="reserve"
                        />
                        <MDBInput
                        className="champs"
                          label="Prix"
                          group
                          type="number"
                          validate
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.prix}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="price"
                        />
                        <span>
                            <label>Visibilité : </label>
                            <select name="visible" default="true" value={this.state.value}  onChange={this.onChange}>
                              <option value="true">Activé</option>
                              <option value="false">Désactivé</option>                            
                            </select><br/> 
                            
                        </span>
                      <label>Images de l'atelier : </label><br/>                     
                      <span> <input required="false" ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" /></span>
                      </div>
                      <div className="text-center">
                      <div className="text-center mb-4">
                      <button className="btn btn-large waves-effect waves-light hoverable orange accent-3" id="couleur" type="submit" >                  
                      Modifier
                    </button>
                  </div>
                  </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
             
             
          </div>
        )}
    
}
