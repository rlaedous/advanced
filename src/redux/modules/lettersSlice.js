import fakeData from "fakeData.json";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letters: [],
};
// 비동기 액션 생성자
export const __getLetters = createAsyncThunk(
  "letters/fetchLetters",
  async (payload, thunkAPI) => {
    console.log("1");
    try {
      const response = await axios.get("http://localhost:5000/letters");
      console.log("response", response);
      // const data = await response.json();
      // console.log("data", data);
      // console.log("2");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const letterSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    ADD_LETTER: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
    },
    DELETE_LETTER: (state, action) => {
      const letterId = action.payload;
      return state.filter((letter) => letter.id !== letterId);
    },
    EDIT_LETTER: (state, action) => {
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
    // default: (state, action) => {
    //   return state;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(__getLetters.fulfilled, (state, action) => {
      // 비동기 액션이 성공하면 서버에서 가져온 데이터로 상태를 갱신
      state.letters = action.payload;
    });
  },
});

export const {} = letterSlice.actions;
export const { ADD_LETTER, DELETE_LETTER, EDIT_LETTER } = letterSlice.actions;
export default letterSlice.reducer;
