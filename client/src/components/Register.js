
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerCooker } from '../actions/authActions';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            firstname:'',
            email: '',
            specialite: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const cooker = {
            name: this.state.name,
            firstname: this.state.firstname,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            specialite: this.state.specialite,
        }
        console.log(cooker);
        
        this.props.registerCooker(cooker, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
        <h2 style={{marginBottom: '40px'}}>Inscription cuisinier</h2>
        <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
                <input
                type="text"
                placeholder="Nom"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                })}
                name="name"
                onChange={ this.handleInputChange }
                value={ this.state.name }
                />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                <span className="red-text">{errors.name}</span>
            </div>
            <div className="form-group">
                <input
                type="text"
                placeholder="Prénom"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.firstname
                })}
                name="firstname"
                onChange={ this.handleInputChange }
                value={ this.state.firstname }
                />
                {errors.firstname && (<div className="invalid-feedback">{errors.firstname}</div>)}
                <span className="red-text">{errors.firstname}</span>
            </div>
            <div className="form-group">
                <input
                type="text"
                placeholder="Spécialité"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.specialite
                })}
                name="specialite"
                onChange={ this.handleInputChange }
                value={ this.state.specialite }
                />
                {errors.specialite && (<div className="invalid-feedback">{errors.specialite}</div>)}
                <span className="red-text">{errors.specialite}</span>
            </div>

            <div className="form-group">
                <input
                type="email"
                placeholder="Email"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                })}
                name="email"
                onChange={ this.handleInputChange }
                value={ this.state.email }
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                <span className="red-text">{errors.email}</span>
            </div>

            <div className="form-group">
                <input
                type="password"
                placeholder="Mot de passe"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                })} 
                name="password"
                onChange={ this.handleInputChange }
                value={ this.state.password }
                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                <span className="red-text">{errors.password}</span>
            </div>

            <div className="form-group">
                <input
                type="password"
                placeholder="Confirmer mot de passe"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password_confirm
                })} 
                name="password_confirm"
                onChange={ this.handleInputChange }
                value={ this.state.password_confirm }
                />
                {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                <span className="red-text">{errors.password_confirm}</span>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-light">
                    Valider
                </button>
            </div>
        </form>
    </div>
        )
    }
}


Register.propTypes = {
    registerCooker: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerCooker })(withRouter(Register))