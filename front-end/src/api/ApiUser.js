import { createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = 'http://localhost:3001/api/v1/user';
// user logIn
//createAsyncThunk
// Une fonction qui accepte une chaîne de type d'action Redux et une fonction de rappel qui doit renvoyer une promesse. Il génère des types d'actions de cycle de vie de promesse en fonction du préfixe de type d'action que vous transmettez et renvoie un créateur d'action de réflexion qui exécutera le rappel de promesse et distribuera les actions de cycle de vie en fonction de la promesse renvoyée.

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Wrong email or password!");
          }
        })
        .then((data) => {
          return data;
        });
        //appel de la function getUserInfo pour récupérer les information utilisateurs en même temps que le logIn.
      const user = await getUserInfos(response.body.token);
      return { email: email, data: user.body, token: response.body.token };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// edit username
export const editUserName = createAsyncThunk(
  "user/editUserName",
  async ({ userName, token }, thunkApi) => {
    try {
      const response = await fetch(
        `${baseUrl}/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ userName }),
        }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        }
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// get user information
async function getUserInfos(token) {
  const response = await fetch(`${baseUrl}/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(
        "An error occurred while retrieving user information."
      );
    }
  });
  return response;
}

