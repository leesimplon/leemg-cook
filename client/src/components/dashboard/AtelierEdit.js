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
        axios.get('https://leemg-cook.herokuapp.com/api/atelier/' + this.props.match.params.atelierId)
          .then(response => {
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
        console.log(data);
        fetch('https://leemg-cook.herokuapp.com/api/ateliers/'+ this.props.match.params.atelierId, {
          method: 'PUT',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
            this.setState({ image: `https://leemg-cook.herokuapp.com/api/ateliers/${body.image}` });
            
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
                    <Link to="/dashboard"><p>Retour au dashboard</p></Link>
                      <p className="h4 text-center py-4">Modifier un atelier </p>
                      <p>*Les anciennes valeurs sont sur les labels, vous pouvez les copier si vous ne voulez pas changer le valeur d'un champs</p>
                      <div className="orange-text">
                        <MDBInput
                          className="champs"
                          label={"Titre: "+this.state.titre}
                          group
                          type="text"
                          error="incorrecte"
                          required="false"
                          placeholder="haha"
                          success="bien" value={this.state.value}  onChange={this.onChange} name="title"
                        />
                        <MDBInput
                        className="champs"
                          label={"Description: "+this.state.desc}
                          group
                          type="textarea"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.desc}
                          success="bien" value={this.state.value} onChange={this.onChange} name="description"
                        />
                        <MDBInput
                        className="champs"
                          label={"Date: "+this.state.dat}
                          group
                          type="date"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.dat}
                          success="bien" value={this.state.value} onChange={this.onChange} name="date"
                        />
                         <MDBInput
                         className="champs"
                          label={"Heure début: "+this.state.heure}
                          group
                          type="time"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.heure}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="hour"
                        />
                         <MDBInput
                         className="champs"
                          label={"Durée: "+this.state.dure}
                          group
                          type="text"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.dure}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="duration"
                        />
                         <MDBInput
                         className="champs"
                          label={"Place disponible: "+this.state.disp}
                          group
                          type="number"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.disp}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="dispo"
                        />
    
                        <MDBInput
                         className="champs"
                          label={"Réservation: "+this.state.resa}
                          group
                          type="number"
                          max={this.state.dispo}
                          required="false"
                          
                          error="incorrecte"
                          placeholder={this.state.resa}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="reserve"
                        />
                        <MDBInput
                        className="champs"
                          label={"Prix: "+this.state.prix}
                          group
                          type="number"
                          
                          error="incorrecte"
                          required="false"
                          placeholder={this.state.prix}
                          success="bien" value={this.state.value} onChange={this.onChange}  name="price"
                        />
                        <div>
                            <label>Visibilité : </label>
                            <select className="browser-default custom-select" name="visible" value={this.state.value}  onChange={this.onChange}>
                              <option value="true">Activé</option>
                              <option value="false">Désactivé</option>                            
                            </select><br/> 
                            
                        </div>
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
