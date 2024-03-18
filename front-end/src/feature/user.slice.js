import { createSlice } from "@reduxjs/toolkit";
/*

createSlice est une fonction qui va générer automatiquement des créateurs d'action et des types d'action qui correspondent aux réducer et à l'état.

*/
import { logIn, editUserName } from "../api/ApiUser"
//condition d'état initiale du site, pas user, pas d'erreur, et un status de connexion sur false
const initialState = {
    user: "",
    status: false,
    error: "",
  };
 /*
 le logout a les même conditions que l'initiale. Les autres actions sont passés en extraReducer(login accepté, rejeté, édition du userNAme).
 Le reducer contient la logique de mise à jour des données.
 On utilise les extrareducers lorsque l'on traite une action déjà définie par les createAsyncThunk.
 createThunk définis un thunk pour récupérer certaines données d'une API. Dans notre cas nous avons logIn et editUserName.
 */ 
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
  