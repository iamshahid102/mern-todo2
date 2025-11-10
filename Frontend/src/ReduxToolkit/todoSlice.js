import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};
export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    handleAddTask: (state) => {},
  },
});
