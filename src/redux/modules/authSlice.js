import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServer from "../../api/auth-api";
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //__editProfile
      .addCase(__editProfile.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__editProfile.fulfilled, (state, action) => {
        const { accessToken, avatar, nickname } = action.payload;
        state.isLoading = false;
        state.isError = false;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          state.accessToken = accessToken;
        }
        if (avatar) {
          localStorage.setItem("avatar", avatar);
          state.avatar = avatar;
        }
        if (nickname) {
          localStorage.setItem("nickname", nickname);
          state.nickname = nickname;
        }
      })
      .addCase(__editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
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

export const __editProfile = createAsyncThunk(
  "editProfile",
  async (formData, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await authServer.patch(`/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const editingObj = {};
      const { nickname, avatar } = data;
      if (nickname) editingObj.nickname = nickname;
      if (avatar) editingObj.avatar = avatar;
      // JSON서버에 내 팬레터들의 닉네임과 아바타 변경
      const userId = localStorage.getItem("userId");
      const { data: myLetters } = await axios.get(
        `http://localhost:5000/letters?userId=${userId}`
      );
      for (const myLetter of myLetters) {
        await axios.patch(
          `http://localhost:5000/letters/${myLetter.id}`,
          editingObj
        );
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const __signUp = createAsyncThunk(
  "users/signUp",
  async (userData, thunkAPI) => {
    try {
      const response = await authServer.post(`/register`, userData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("회원가입 중 에러 발생 네트워크 메시지확인!!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __logIn = createAsyncThunk(
  "users/logIn",
  async (userData, thunkAPI) => {
    try {
      const response = await authServer.post(
        // 만료시간 연습.. 잊지말자!!!!!
        `/login?expiresIn=50m`,
        userData
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("로그인 중 에러발생 네트워크 메시지확인!!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __logOut = createAsyncThunk(
  "users/logOut",
  async (payload, thunkAPI) => {
    try {
    } catch (error) {
      alert("로그아웃 중 에러발생 네트워크 메시지확인!!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default authSlice.reducer;
