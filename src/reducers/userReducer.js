import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    putUser(state, action) {
      return action.payload;
    },
  },
});

export const { putUser } = userSlice.actions;
export const setUser = (user) => {
  return (dispatch) => {
    dispatch(putUser(user));
  };
};
export default userSlice.reducer;
