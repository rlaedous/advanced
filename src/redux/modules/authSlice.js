import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLogin: localStorage.getItem("accessToken") ? true : false,
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  // accessToken: localStorage.getItem("accessToken"),
  isLoading: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //__logIn
      .addCase(__logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logIn.fulfilled, (state, action) => {
        const { accessToken, userId, avatar, nickname } = action.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("nickname", nickname);
        state.isLogin = true;
        state.userId = userId;
        state.avatar = avatar;
        state.nickname = nickname;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      //__logOut
      .addCase(__logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logOut.fulfilled, (state, action) => {
        localStorage.removeItem("accessToken");
        state.isLoading = false;
        state.isError = false;
        state.isLogin = false;
        state.accessToken = null;
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
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        userData
      );
      console.log(userData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("회원가입 중 에러 발생 네트워크 메시지확인!!");
      console.log("users/signUp/error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __logIn = createAsyncThunk(
  "users/logIn",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        // 만료시간 연습.. 잊지말자!!!!!
        `${process.env.REACT_APP_SERVER_URL}/login?expiresIn=5s`,
        userData
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("로그인 중 에러발생 네트워크 메시지확인!!");
      console.log("users/logIn/error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __logOut = createAsyncThunk(
  "users/logOut",
  async (userData, thunkAPI) => {
    try {
      console.log("로그아웃!");
    } catch (error) {
      alert("로그아웃 중 에러발생 네트워크 메시지확인!!");
      console.log("users/logOut/error", error);
    }
  }
);

// export const __userInfo = createAsyncThunk(
//   "users/userInfo",
//   async (userData, thunkAPI) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `https://moneyfulpublicpolicy.co.kr/user`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(userData);
//       console.log(response);
//       return thunkAPI.fulfillWithValue(response);
//     } catch (error) {
//       alert("에러발생!");
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export default authSlice.reducer;
