import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IDataState {
  grid: Array<any> | null;
  words: Array<any> | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IDataState = {
  grid: null,
  words: null,
  isLoading: false,
  hasError: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    onLoad: (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.grid = null;
      state.words = null;
    },
    onSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.hasError = false;
      state.grid = action.payload.grid;
      state.words = action.payload.words;
    },
    onError: (state) => {
      state.hasError = true;
    },
  },
});

export const { onLoad, onSuccess, onError } = gridSlice.actions;
export const selectGrid = (state: RootState) => state.data.grid;
export const selectWords = (state: RootState) => state.data.words;

export default gridSlice.reducer;
