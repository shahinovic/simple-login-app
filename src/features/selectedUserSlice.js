import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: {},
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
