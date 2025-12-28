import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  mode: Theme;
}

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("nexstock-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      localStorage.setItem("nexstock-theme", action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.mode === "light" ? "dark" : "light";
      state.mode = newTheme;
      localStorage.setItem("nexstock-theme", newTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;