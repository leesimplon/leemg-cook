import React, { Component } from 'react'

export default class AtelierInscrive extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          idAtel:'',
          name: '',
          firstname:'',
          phone: ''
        };
    
        this.onChange = this.onChange.bind(this)
        this.onSubmite = this.onSubmite.bind(this);
      }
    
      onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    onSubmite(ev) {
        ev.preventDefault();
        console.log(this.props.match.params.atelierId);
        
        const data = new FormData();
        data.append('idAtel',this.props.match.params.atelierId);
        data.append('name',this.state.name);
        data.append('firstname',this.state.firstname);
        data.append('email',this.state.mail);
        data.append('phone',this.state.date);
      
        fetch('https://leemg-cook.herokuapp.com/api/partics/attend', {
          method: 'POST',
          body: data,
        });
      }
      
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="md-col-12">
            <form className="was-validated" onSubmit={this.onSubmite}>
                <div className="form-group">
                    <label htmlFor="name">Nom:</label>
                    <input type="text" className="form-control" placeholder="Votre nom" name="name" value={this.state.value}  onChange={this.onChange}  required/>
                    <div className="valid-feedback">Valide.</div>
                    <div className="invalid-feedback">Veuillez remplir le champs correctement.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom:</label>
                    <input type="text" className="form-control" id="prenom" placeholder="Votre prénom" name="firstname" value={this.state.value}  onChange={this.onChange} required/>
                    <div className="valid-feedback">Valide.</div>
                    <div className="invalid-feedback">Veuillez remplir le champs  correctement.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="mail">Email:</label>
                    <input type="email" className="form-control" placeholder="Votre email" name="mail" value={this.state.value}  onChange={this.onChange} required/>
                    <div className="valid-feedback">Valide.</div>
                    <div className="invalid-feedback">Veuillez remplir le champs correctement.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Téléphone:</label>
                    <input type="text" className="form-control" placeholder="Votre numéro de téléphone" name="phone" value={this.state.value}  onChange={this.onChange} />
                    <div className="valid-feedback">Non obligatoire.</div>
                </div>
                <button type="submit" className="btn btn-light">Valider</button>
            </form>
            </div>
            </div>
            </div>
        )
    }
}
