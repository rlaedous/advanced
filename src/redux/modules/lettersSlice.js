import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

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
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.letters = action.payload;
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
      const response = await api.get("/letters?_sort=-createdAt");

      console.log("response", response);
      // const response = await axios.get("http://localhost:5000/letters", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      console.log("response.data", response.data);
      // const data = await response.json();
      // console.log("data", data);
      // console.log("2");

      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("에러발생");
      console.log(error);
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "letters/addLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/letters", payload);
      console.log("payload", payload);
      console.log("response.data", response.data);
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("에러발생!");
      console.log(error);
      // dispatch를 해주는 기능을 가진 api
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { DELETE_LETTER, EDIT_LETTER } = letterSlice.actions;
export default letterSlice.reducer;
