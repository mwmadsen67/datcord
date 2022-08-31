
const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
const LOGOUT_USER = "LOGOUT_USER"

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

export const sessionsReducer = (action, state = {id: null}) => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.id = user.id;
      return nextState;
    case LOGOUT_USER:
      nextState.id = null;
      return nextState;
    default:
      return state;
  }
}