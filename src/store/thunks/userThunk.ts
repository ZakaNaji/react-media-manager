import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";

const apiRootURL = import.meta.env.VITE_API_ROOT;

const fetchUsers = createAsyncThunk<User, void, { rejectValue: string }>(
  "users/fetch",
  async () => {
    const resp = await axios.get(`${apiRootURL}/users`);
    const data = await resp.data;

    await pause(1000);

    return data;
  }
);

const addUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "users/add",
  async () => {
    const newUser = { name: faker.name.firstName() };
    const resp = await axios.post(`${apiRootURL}/users`, newUser);
    const data = await resp.data;

    await pause(1000);
    return data;
  }
);

const deleteUser = createAsyncThunk<
  string, // Returned
  string,
  { rejectValue: string } // 👈 string error
>("users/delete", async (id: string, { rejectWithValue }) => {
  try {
    const resp = await axios.delete(`${apiRootURL}/users/${id}`);
  } catch (e) {
    return rejectWithValue("Error deleting user: ");
  }

  return id;
});

const pause = (durration: number) => {
  if (import.meta.env.VITE_SIMULATE_DATA_FETCHING) {
    return new Promise((resolve) => setTimeout(resolve, durration));
  }
};

export { fetchUsers, addUser, deleteUser };
