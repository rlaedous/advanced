import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import letterClient from "../../axios/letter-api";
import { __logOut } from "./authSlice";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const letterSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //__getLetters
      //스토어 접근가능
      .addCase(__getLetters.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

      // 이 나쁜놈의 state.error = null 잊지말자.......................
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.letters = action.payload;
        ////////////////////////////강조////////////////////////
        state.error = null;
        ////////////////////////////강조////////////////////////
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      //__addLetters
      .addCase(__addLetters.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.letters = [action.payload, ...state.letters];
      })
      .addCase(__addLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

// 전에 알던 스토어에 저장하는 로직은 return쪽
export const __getLetters = createAsyncThunk(
  "letters/getLetters",
  async (payload, thunkAPI) => {
    try {
      // -createdAt 내림차순 정렬
      const response = await letterClient.get("/?_sort=-createdAt");
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("팬레터 조회 중 에러 발생 네트워크 메시지확인!!");
      console.log("letters/getLetters/error", error);
      // 다른슬라이스 디스패치
      thunkAPI.dispatch(__logOut());
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "letters/addLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await letterClient.post("/", payload);
      console.log("payload", payload);
      console.log("response.data", response.data);
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      alert("팬레터 추가 중 에러발생 네트워크 메시지확인!!");
      console.log("letters/addLetters/error", error);
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { DELETE_LETTER, EDIT_LETTER } = letterSlice.actions;
export default letterSlice.reducer;
