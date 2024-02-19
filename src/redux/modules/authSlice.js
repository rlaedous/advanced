import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogin: localStorage.getItem("accessToken") ? true : false,
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  isLoading: false,
  isError: false,
  error: null,
};

// UserInfo: async (state, action) => {
//   try {
//     const response = await axios.get(
//       "https://moneyfulpublicpolicy.co.kr/user",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     alert("이러발생@");
//   }
// },

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logIn.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("avatar", action.payload.avatar);
        localStorage.setItem("nickname", action.payload.nickname);
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isLogin = true;
      })
      .addCase(__logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      .addCase(__logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logOut.fulfilled, (state, action) => {
        localStorage.clear();
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isLogin = false;
      })
      .addCase(__logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const __signUp = createAsyncThunk(
  "users/signUp",
  async (credentials) => {
    await axios.post(
      "https://moneyfulpublicpolicy.co.kr/register",
      credentials
    );
  }
);

export const __logIn = createAsyncThunk(
  "users/logIn",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        userData
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  }
);

export const __logOut = createAsyncThunk(
  "users/logOut",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  }
);
export default authSlice.reducer;
