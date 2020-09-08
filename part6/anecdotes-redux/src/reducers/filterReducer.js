export const updateFilter = (filter) => {
  return {
    type: "filter/updated",
    filter,
  };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "filter/updated":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
