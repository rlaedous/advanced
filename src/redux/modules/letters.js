import fakeData from "fakeData.json";
import { createSlice } from "@reduxjs/toolkit";

// 팬레터 추가
// const ADD_LETTER = "letters/ADD_LETTER";
// // 팬레터 삭제
// const DELETE_LETTER = "letters/DELETE_LETTER";
// // 팬레터 수정
// const EDIT_LETTER = "letters/EDIT_LETTER";

// export const addLetter = (payload) => {
//   return { type: ADD_LETTER, payload };
// };
// export const deleteLetter = (payload) => {
//   return { type: DELETE_LETTER, payload };
// };
// export const editLetter = (payload) => {
//   return { type: EDIT_LETTER, payload };
// };

const initialState = fakeData;

// const letters = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_LETTER:
//       const newLetter = action.payload;
//       return [newLetter, ...state];
//     case DELETE_LETTER:
//       const letterId = action.payload;
//       return state.filter((letter) => letter.id !== letterId);
//     case EDIT_LETTER:
//       const { id, editingText } = action.payload;
//       return state.map((letter) => {
//         if (letter.id === id) {
//           return { ...letter, content: editingText };
//         }
//         return letter;
//       });
//     default:
//       return state;
//   }
// };
const letterSlice = createSlice({
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
    default: (state, action) => {
      return state;
    },
  },
});

export const { ADD_LETTER, DELETE_LETTER, EDIT_LETTER } = letterSlice.actions;
export default letterSlice.reducer;
// export default letters;
