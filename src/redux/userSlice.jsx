// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  walletAddress: "",
  profileImage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, walletAddress, profileImage } = action.payload;
      state.name = name;
      state.walletAddress = walletAddress;
      state.profileImage = profileImage;
    },
    clearUserData: (state) => {
      state.name = "";
      state.walletAddress = "";
      state.profileImage = "";
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
