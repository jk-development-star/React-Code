const initialState = {
  lead: null,
  findLead: null,
};
function leadReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADDLEAD":
      return {
        ...state,
        lead: [...state.lead, payload],
      };
    case "TOTALLEAD":
      return {
        ...state,
        lead: payload,
      };

    case "FINDLEAD":
      return {
        ...state,
        findLead: state.lead.find((i) => i.id === payload),
      };
    case "UPDATELEAD":
      return {
        ...state,
        lead: state.lead.map((i) =>
          i.id === payload.id
            ? {
                ...i,
                ...payload,
              }
            : i
        ),
      };
    default:
      return state;
  }
}

export default leadReducer;
