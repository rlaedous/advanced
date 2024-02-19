import { createSlice } from "@reduxjs/toolkit";
// const SET_MEMBER = "member/SET_MEMBER";

// export const setMember = (payload) => {
//   return { type: SET_MEMBER, payload };
// };

const initialState = "카리나";

// const member = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_MEMBER:
//       const activeMember = action.payload;
//       return activeMember;
//     default:
//       return state;
//   }
// };

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
// export default member;
