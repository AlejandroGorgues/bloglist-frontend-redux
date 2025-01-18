import { createSlice } from "@reduxjs/toolkit";
import authorsService from "../services/authors.js";
import { setNotification } from "./notificationReducer.js";
const authorReducer = createSlice({
  name: "authors",
  initialState: [],
  reducers: {
    setAuthors(state, action) {
      return action.payload;
    }
  },
});

export const { setAuthors } =
  authorReducer.actions;
export const initializeAuthors = () => {
  return async (dispatch) => {
    
    const response = await authorsService.getAll();
    if (response.status == 200) {
      const authors = response.data;
      dispatch(setAuthors(authors));
    } else {
      dispatch(setNotification(error.response?.data?.error, "error", 5000));
    }
  };
};

export default authorReducer.reducer;
