import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface AuthState {
  isLoading: boolean;
  token: string | null;
  isShowPassword: boolean;
  isShowConfPassword: boolean;
  name: string;
  isLoggin: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  token: localStorage.getItem(import.meta.env.VITE_REACT_APP_AUTH as string),
  isShowPassword: false,
  isShowConfPassword: false,
  name: "",
  isLoggin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserData: (state) => {
      if (state.token !== null) {
        const splitToken = state.token?.split(" ")[1];
        const decodeToken: any = jwtDecode(splitToken);
        state.isLoggin = true;
        state.name = decodeToken.username;
      }
    },
    showPassword: (state) => {
      state.isShowPassword = !state.isShowPassword;
    },
    showConfPassword: (state) => {
      return { ...state, isShowConfPassword: !state.isShowConfPassword };
    },
    logout: (state) => {
      localStorage.removeItem(import.meta.env.VITE_REACT_APP_AUTH as string);
      state.name = "";
      state.token = null;
      state.isLoggin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isShowPassword = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { Authorization } = action.payload;
        state.isLoading = false;
        state.token = Authorization;
        state.isLoggin = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isShowPassword = false;
      })
      .addCase(register.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isShowPassword: false,
          isShowConfPassword: false,
        };
      })
      .addCase(register.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(register.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          isShowPassword: false,
          isShowConfPassword: false,
        };
      });
  },
});

export const { setUserData, showPassword, showConfPassword, logout } = authSlice.actions;
export default authSlice.reducer;

export const login = createAsyncThunk("login", async (value: any) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, value);

    if (data.Authorization !== undefined)
      localStorage.setItem(import.meta.env.VITE_REACT_APP_AUTH as string, data.Authorization);

    return data;
  } catch (error: any) {
    throw error.response.data;
  }
});

export const register = createAsyncThunk("register", async (data: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/register`, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
});
