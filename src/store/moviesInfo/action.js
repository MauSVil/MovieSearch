export const updateMovies = (payload) => {
  return {
    type: "UPDATE_MOVIES",
    payload,
  };
};

export const updateActor = (payload) => {
  return {
    type: "UPDATE_ACTOR",
    payload,
  };
};
