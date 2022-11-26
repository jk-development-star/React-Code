function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGINUSER":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}

export default reducer;
