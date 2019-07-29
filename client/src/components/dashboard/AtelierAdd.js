import React from 'react';
import { MDBCol,MDBInput,MDBCard, MDBCardBody} from "mdbreact";
import { Link } from 'react-router-dom';
import './AtelierAdd.css';

class AtelierAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idCooker:'',
      title: '',
      description:'',
      date: '',
      hour: '',
      duration: '',
      dispo: '',
      reserve: '',
      price: '',
      image:'',
      visible:''
    };

    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  onChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}

  handleUploadImage(ev) {
    ev.preventDefault();
    console.log(this.props.match.params.cookerId);
    
    const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    data.append('idCooker',this.props.match.params.cookerId);
    data.append('title',this.state.title);
    data.append('description',this.state.description);
    data.append('date',this.state.date);
    data.append('hour',this.state.hour);
    data.append('duration',this.state.duration);
    data.append('dispo',this.state.dispo);
    data.append('reserve',this.state.reserve||0);
    data.append('price',this.state.price);
    data.append('visible',true);
  
    fetch('http://localhost:8080/api/ateliers', {
      method: 'POST',
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
                  <p className="h4 text-center py-4">Ajouter un atelier </p>
                  <div className="orange-text">
                    <MDBInput
                      className="champs"
                      label="Titre"
                      group
                      type="text"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value}  onChange={this.onChange} name="title"
                    />
                    <MDBInput
                    className="champs"
                      label="Déscription"
                      group
                      type="textarea"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange} name="description"
                    />
                    <MDBInput
                    className="champs"
                      label="Date"
                      group
                      type="date"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange} name="date"
                    />
                     <MDBInput
                     className="champs"
                      label="Horaire début"
                      group
                      type="time"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange}  name="hour"
                    />
                     <MDBInput
                     className="champs"
                      label="Durée"
                      group
                      type="text"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange}  name="duration"
                    />
                     <MDBInput
                     className="champs"
                      label="Nombre de place disponible"
                      group
                      type="number"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange}  name="dispo"
                    />

                    <MDBInput
                     className="champs"
                      label="Nombre de place résérvé(s)"
                      group
                      type="number"
                      max={this.state.dispo}
                      required="true"
                      validate
                      error="incorrecte"
                      success="bien" value={this.state.value} onChange={this.onChange}  name="reserve"
                    />
                    <MDBInput
                    className="champs"
                      label="Prix"
                      group
                      type="number"
                      validate
                      error="incorrecte"
                      required="true"
                      success="bien" value={this.state.value} onChange={this.onChange}  name="price"
                    />
                  <label>Images de l'atelier : </label><br/>
                 
                  <span> <input required="true" ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" /></span>
                  </div>
                  <div className="text-center">
                  <div className="text-center mb-4">
                  <button className="btn btn-large waves-effect waves-light hoverable orange accent-3" id="couleur" type="submit" >                  
                  Ajouter
                </button>
              </div>
              </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
         
         
      </div>
    );
  }
}

export default AtelierAdd;
