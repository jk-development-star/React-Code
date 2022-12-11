const initialState = {
  user: null
}
function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case "LOGINUSER":
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}

export default reducer;
