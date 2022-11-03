import { csrfFetch } from "./csrf";

const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
const LOGOUT_USER = "LOGOUT_USER"

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

export const signup = (user) => dispatch => {
  return csrfFetch('api/users', { method: 'POST', body: JSON.stringify(user) })
    .then(res => res.json())
    .then(data => {
      storeCurrentUser(data.user);
      return dispatch(receiveCurrentUser(data.user))
    })
}

export const login = (user) => dispatch => {
  return csrfFetch('api/session', {method: 'POST', body: JSON.stringify(user)})
    .then(res => res.json())
    .then(data => {
      storeCurrentUser(data.user);
      return dispatch(receiveCurrentUser(data.user))
    })
}

export const logout = () => dispatch => {
  return csrfFetch('api/session', {method: 'DELETE'})
    .then(res => res.json())
    .then(data => {
      storeCurrentUser(null);
      return dispatch(logoutUser())
    })
}

export const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(receiveCurrentUser(data.user));
  return response;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

export const usersReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state)

  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   nextState[action.user.id] = action.user
    //   return nextState;
    default:
      return state;
  }
}

export const sessionsReducer = (state = initialState, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.user = action.user;
      return nextState;
    case LOGOUT_USER:
      nextState.user = null;
      return nextState;
    default:
      return state;
  }
}

// import csrfFetch from "./csrf.js";

// const SET_CURRENT_USER = 'session/setCurrentUser';
// const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

// const setCurrentUser = (user) => ({
//   type: SET_CURRENT_USER,
//   payload: user
// });

// const removeCurrentUser = () => ({
//   type: REMOVE_CURRENT_USER
// });

// const storeCSRFToken = response => {
//   const csrfToken = response.headers.get("X-CSRF-Token");
//   if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// }



// export const login = ({ email, password }) => async dispatch => {
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({ email, password })
//   });
//   const data = await response.json();
//   storeCurrentUser(data.user);
//   dispatch(setCurrentUser(data.user));
//   return response;
// };

// export const restoreSession = () => async dispatch => {
//   const response = await csrfFetch("/api/session");
//   storeCSRFToken(response);
//   const data = await response.json();
//   storeCurrentUser(data.user);
//   dispatch(setCurrentUser(data.user));
//   return response;
// };

// export const signup = (user) => async (dispatch) => {
//   const { email, password } = user; //followup: change to camelcase
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password
//     })
//   });
//   const data = await response.json();
//   storeCurrentUser(data.user);
//   dispatch(setCurrentUser(data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch("/api/session", {
//     method: "DELETE"
//   });
//   storeCurrentUser(null);
//   dispatch(removeCurrentUser());
//   return response;
// };

// const initialState = {
//   user: JSON.parse(sessionStorage.getItem("currentUser"))
// };

// export const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       return { ...state, user: action.payload };
//     case REMOVE_CURRENT_USER:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// // export default sessionReducer;