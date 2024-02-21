import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import letterClient from "../../api/letter-api";
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
  reducers: {
    DELETE_LETTER: (state, action) => {
      const letterId = action.payload;
      //console.log("state", state);
      //console.log("letterId", letterId);
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
  },
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
      })
      //__editLetters
      .addCase(__editLetters.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__editLetters.fulfilled, (state, action) => {
        //console.log("action.payload", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.letters = [action.payload, ...state.letters];
        // state.letters = [...state.letters, action.payload];
      })
      .addCase(__editLetters.rejected, (state, action) => {
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
      //console.log("letters/getLetters/error", error);
      // 다른슬라이스 디스패치
      thunkAPI.dispatch(__logOut());
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "letters/addLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await letterClient.post("/", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      alert("팬레터 추가 중 에러발생 네트워크 메시지확인!!");
      //console.log("letters/addLetters/error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetters = createAsyncThunk(
  "letters/deleteLetters",
  async (id, thunkAPI) => {
    try {
      const response = await letterClient.delete(`/${id}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("팬레터 삭제 중 에러발생 네트워크 메시지확인!!");
      //console.log("letters/deleteLetters/error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editLetters = createAsyncThunk(
  "letters/editLetters",
  async ({ id, editingText }, thunkAPI) => {
    try {
      const response = await letterClient.patch(`${id}`, {
        content: editingText,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("팬레터 수정 중 에러발생 네트워크 메시지확인!!");
      //console.log("letters/editLetters/error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default letterSlice.reducer;
