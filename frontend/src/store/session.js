import { csrfFetch } from "./csrf";

const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
const LOGOUT_USER = "LOGOUT_USER"

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

export const login = (user) => dispatch => {
  return csrfFetch('api/session', {method: 'POST', body: JSON.stringify(user)})
    .then(res => res.json())
    .then(data => dispatch(receiveCurrentUser(data)))
}

export const logout = () => dispatch => {
  return csrfFetch('api/session', {method: 'DELETE'})
    .then(res => res.json())
    .then(data => dispatch(logoutUser()))
}

export const sessionsReducer = (state = {id: null}, action) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.id = action.user.id;
      return nextState;
    case LOGOUT_USER:
      nextState.id = null;
      return nextState;
    default:
      return state;
  }
}