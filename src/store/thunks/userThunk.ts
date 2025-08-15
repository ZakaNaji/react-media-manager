import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const resp = await axios.get("http://localhost:3005/users");
  const data = await resp.data;
  console.log(data);
  return data;
});

export { fetchUsers };
