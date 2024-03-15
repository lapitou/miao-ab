import { createSlice } from "@reduxjs/toolkit";
import { logIn, editUserName } from "../api/ApiUser"

const initialState = {
    user: "",
    status: false,
    error: "",
  };
  
const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logOut: (state)=> {
        state.user = " "
        state.status = false;
        state.error = "";
      }
    },
    extraReducers(builder) {
      builder
        .addCase(logIn.fulfilled, (state, action) => {
          state.user ={
            email: action.payload.email,
            token: action.payload.token,
            firstName: action.payload.data.firstName,
            lastName: action.payload.data.lastName,
            userName: action.payload.data.userName,
            userId: action.payload.data.id
          };
          state.status = true;
          state.error = "";
        })
        .addCase(logIn.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload;
        })
        .addCase(editUserName.fulfilled, (state, action) => {
          let user = state.user;
          user.userName = action.payload.body.userName;
          state.user = user;
          state.status = true;
        });
    },
  });
  
  export default authSlice.reducer;
  export const {logOut} = authSlice.actions;
  