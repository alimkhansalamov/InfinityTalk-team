const initialState = {
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/load/pending":
      return {
        ...state,
      };
    case "users/load/fulfilled":
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

export const loadUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "users/load/pending" });
    const res = await fetch("http://localhost:4000/users");
    const users = await res.json();
    dispatch({
      type: "users/load/fulfilled",
      payload: users,
    });
  };
};
