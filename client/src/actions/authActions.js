import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_COOKER } from "./types";

// // Register Cooker
// export const registerCooker = (cookerData, history) => dispatch => {
//   axios
//     .post("http://localhost:8080/api/cookers/register", cookerData)
//     .then(res =>{ history.push("/login")
//             console.log(res);
//         })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Login - get Cooker token
// export const loginCooker = cookerData => dispatch => {
//   axios
//     .post("http://localhost:8080/api/cookers/login", cookerData)
//     .then(res => {
//       // Save to localStorage

//       // Set token to localStorage
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get cooker data
//       const decoded = jwt_decode(token);
//       // Set current cooker
//       dispatch(setCurrentCooker(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Set logged in cooker
// export const setCurrentCooker = decoded => {
//   return {
//     type: SET_CURRENT_COOKER,
//     payload: decoded
//   };
// };

// // cooker loading
// // export const setCookerLoading = () => {
// //   return {
// //     type: COOKER_LOADING
// //   };
// // };

// // Log user out
// export const logoutCooker = () => dispatch => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentCooker({}));
// };


export const registerCooker = (cooker, history) => dispatch => {
  axios.post('http://localhost:8080/api/cookers/register', cooker)
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
  axios.post('http://localhost:8080/api/cookers/login', cooker)
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