import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_COOKER } from "./types";
export const registerCooker = (cooker, history) => dispatch => {
  axios.post('https://leemg-cook.herokuapp.com/api/cookers/register', cooker)
          .then(res => history.push('/login'))
          .catch(err => {
              dispatch({
                  type: GET_ERRORS,
                  payload: err.response.data
              });
              console.log(err.kind+': ERREUR BE :'+err.stack);
              
          });
}

export const loginCooker = (cooker) => dispatch => {
  axios.post('https://leemg-cook.herokuapp.com/api/cookers/login', cooker)
          .then(res => {
              const { token } = res.data;
              localStorage.setItem('jwtToken', token);
              setAuthToken(token);
              const decoded = jwt_decode(token);
              dispatch(setCurrentCooker(decoded));
          })
          .catch(err => {
              dispatch({
                  type: GET_ERRORS,
                  payload: err.response.data
              });
          });
}

export const setCurrentCooker = decoded => {
  return {
      type: SET_CURRENT_COOKER,
      payload: decoded
  }
}

export const logoutCooker = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentCooker({}));
  history.push('/login');
}