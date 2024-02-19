import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      .addCase(__getLetters.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.letters = action.payload;
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = true;
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
        state.isError = true;
        state.letters = [action.payload, ...state.letters];
      })
      .addCase(__addLetters.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const __getLetters = createAsyncThunk(
  "letters/getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/letters");
      // const response = await axios.get("http://localhost:5000/letters", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      console.log("response", response);
      // const data = await response.json();
      // console.log("data", data);
      // console.log("2");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("에러발생");
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "letters/addLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/letters",
        payload
      );
      console.log("payload", payload);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("에러발생!");
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { DELETE_LETTER, EDIT_LETTER } = letterSlice.actions;
export default letterSlice.reducer;
