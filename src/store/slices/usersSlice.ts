import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { fetchUsers } from "../thunks/userThunk";

interface UserSliceState {
  data: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserSliceState = {
  data: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const usersReducer = userSlice.reducer;
