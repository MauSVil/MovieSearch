const initialState = {
  movies: {},
  actor: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "UPDATE_ACTOR":
      return {
        ...state,
        actor: action.payload,
      };
    default:
      return state;
  }
};
