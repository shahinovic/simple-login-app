import { configureStore } from "@reduxjs/toolkit";

// Import any slice reducers you've created
import selectedUserReducer from "./features/selectedUserSlice";
import usersReducer from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer, // Register your slices here
    users: usersReducer,
  },
});
