import { createSlice } from "@reduxjs/toolkit";

const initialState = "카리나";

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    SET_MEMBER: (state, action) => {
      const activeMember = action.payload;
      return activeMember;
    },
    default: (state, action) => {
      return state;
    },
  },
});

export const { SET_MEMBER } = memberSlice.actions;
export default memberSlice.reducer;
