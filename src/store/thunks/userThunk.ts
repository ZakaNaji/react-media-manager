import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const resp = await axios.get("http://localhost:3005/users");
  const data = await resp.data;
  console.log(import.meta.env.VITE_SIMULATE_DATA_FETCHING);

  if (import.meta.env.VITE_SIMULATE_DATA_FETCHING) {
    await pause(1000);
  }
  return data;
});

const pause = (durration: number) =>
  new Promise((resolve) => setTimeout(resolve, durration));

export { fetchUsers };
