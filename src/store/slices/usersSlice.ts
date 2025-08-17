import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import { addUser, deleteUser, fetchUsers } from "../thunks/userThunk";

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

    builder
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
  },
});

export const usersReducer = userSlice.reducer;
