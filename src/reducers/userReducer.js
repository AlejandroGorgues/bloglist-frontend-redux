import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(window.localStorage.getItem("loggedNoteappUser"));
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { putUser, removeUser } = userSlice.actions;
export const setUser = (user) => {
  return (dispatch) => {
    dispatch(putUser(user));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
