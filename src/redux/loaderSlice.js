import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    handler: (state, action) => {
      state.loader = action.payload;
    },
  },
});
export const { handler } = loaderSlice.actions;
export default loaderSlice.reducer;
export const selectLoader = (state) => state.loaderHandler.loader
