import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        return data.body;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
    userInfo: null,
    isAuthenticated: false,
    sessionChecked: false,
    token: null,
    rememberedCredentials: {
      email: "",
      password: "",
    },
  };  

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.sessionChecked = true;
      state.token = null;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    restoreSession: (state) => {
        state.isAuthenticated = true;
        state.sessionChecked = true;
    },
    noSessionFound: (state) => {
        state.sessionChecked = true;
    },
    markSessionChecked: (state) => {
        state.sessionChecked = true;
    },
    rememberedCredentials: (state, action) => {
        state.rememberedCredentials = action.payload;
    },
    clearRememberedCredentials: (state) => {
        state.rememberedCredentials = {
            email: "",
            password: "",
        };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
    })
  }
});

export const { loginSuccess, logout, updateUserInfo, restoreSession, noSessionFound, markSessionChecked, rememberedCredentials, clearRememberedCredentials } = userSlice.actions;
export default userSlice.reducer;
