import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

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
});

export const usersReducer = userSlice.reducer;
