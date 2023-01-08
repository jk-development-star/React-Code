const initialState = {
  user: null,
  totalUser: null
}
function UserReducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case "LOGINUSER":
      return {
        ...state,
        user: payload
      };
    case "ADDNEWUSER":
      return {
        ...state,
        totalUser: [...state.totalUser, payload]
      };
    case "TOTALUSER":
      return {
        ...state,
        totalUser: payload
      };
    case "DELETEUSER":
      return { ...state, totalUser: state.totalUser.filter(i => i.id !== payload.id) };
    case "EDITUSER":
      return {
        ...state,
        totalUser: [...state.totalUser, payload]
      }
    default:
      return state
  }
}

export default UserReducer;
