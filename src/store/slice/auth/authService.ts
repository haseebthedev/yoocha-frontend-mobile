import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  SignupResponseI,
  SignupPayloadI,
  SigninPayloadI,
  SigninResponseI,
  ForgetPasswordPayloadI,
  ForgetPasswordResponseI,
} from "./types";
import { API_URL } from "config/config.dev";
import { saveString } from "utils/storage";
import { showFlashMessage } from "utils/flashMessage";

export const signupService: any = createAsyncThunk(
  "auth/signup",
  async (payload: SignupPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SignupResponseI> = await axios.post(`${API_URL}/auth/signup`, {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password,
      });

      showFlashMessage("success", "Signup Successfully!");

      return response.data;
    } catch (error: any) {
      showFlashMessage("danger", `${error?.response?.data?.message || "Something went wrong!"}`);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const signinService: any = createAsyncThunk(
  "auth/signin",
  async (payload: SigninPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SigninResponseI> = await axios.post(`${API_URL}/auth/signin`, {
        email: payload.email,
        password: payload.password,
      });

      if (response?.data?.result?.token) {
        const { result } = response.data;
        await saveString("UserToken", result.token);
      }

      showFlashMessage("success", "Login Successfully!");

      return response.data;
    } catch (error: any) {
      showFlashMessage("danger", `${error?.response?.data?.message || "Something went wrong!"}`);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const forgetPasswordService: any = createAsyncThunk(
  "auth/forgetPassword",
  async (payload: ForgetPasswordPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ForgetPasswordResponseI> = await axios.post(`${API_URL}/auth/forget-password`, {
        email: payload.email,
      });

      showFlashMessage("success", `${response.data.result.result}`);

      return response.data;
    } catch (error: any) {
      showFlashMessage("danger", `${error?.response?.data?.message || "Something went wrong!"}`);

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);
