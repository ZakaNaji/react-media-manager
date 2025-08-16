import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiRootURL = import.meta.env.VITE_API_ROOT;

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const resp = await axios.get(`${apiRootURL}/users`);
  const data = await resp.data;

  if (import.meta.env.VITE_SIMULATE_DATA_FETCHING) {
    await pause(1000);
  }
  return data;
});

const addUser = createAsyncThunk("users/add", async () => {
  const newUser = { name: "Test1" };
  const resp = await axios.post(`${apiRootURL}/users`, newUser);
  const data = await resp.data;

  console.log(data);
  return data;
});

const pause = (durration: number) =>
  new Promise((resolve) => setTimeout(resolve, durration));

export { fetchUsers, addUser };
