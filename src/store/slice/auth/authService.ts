import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  SignupResponseI,
  SignupPayloadI,
  SigninPayloadI,
  SigninResponseI,
  ForgetPasswordPayloadI,
  ForgetPasswordResponseI,
  UpdateUserPayloadI,
  UpdateUserResponseI,
  getMyProfileResponseI,
  ChangePasswordPayloadI,
  ChangePasswordResponseI,
  ContactUsResponseI,
  deleteMyProfileResponseI,
} from "./types";
import { API_URL } from "config/config.dev";
import { saveString } from "utils/storage";
import { showFlashMessage } from "utils/flashMessage";
import AxiosInstance from "services/api/api";
import { ContactUsI } from "interfaces";

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

      showFlashMessage({ type: "success", message: "Signup Successfully!" });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const signinService: any = createAsyncThunk(
  "auth/signin",
  async (payload: SigninPayloadI, { rejectWithValue }) => {
    try {
      console.log("ok");
      const response: AxiosResponse<SigninResponseI> = await axios.post(`${API_URL}/auth/signin`, {
        email: payload.email,
        password: payload.password,
      });

      if (response?.data?.result?.token) {
        const { result } = response.data;
        await saveString("UserToken", result.token);
      }

      showFlashMessage({ type: "success", message: "Login Successfully!" });
      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });
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

      showFlashMessage({ type: "success", message: `${response.data.result.result}` });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const updateUserService: any = createAsyncThunk(
  "auth/updateUser",
  async (payload: UpdateUserPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<UpdateUserResponseI> = await AxiosInstance.patch(`/user/me`, {
        profilePicture: payload.profilePicture,
        firstname: payload.firstname,
        lastname: payload.lastname,
        dateOfBirth: payload.dateOfBirth,
        country: payload.country,
      });

      // showFlashMessage({ type: "success", message: "User Successfully Updated!" });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });
      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const getMyProfileService: any = createAsyncThunk("auth/getMyProfile", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<getMyProfileResponseI> = await AxiosInstance.get(`/user/me`);

    // showFlashMessage({ type: "success", message: "User Successfully Updated!" });
    return response.data;
  } catch (error: any) {
    showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });
    return rejectWithValue(error?.response?.data || "Something went wrong!");
  }
});

export const changePasswordService: any = createAsyncThunk(
  "auth/changePassword",
  async (payload: ChangePasswordPayloadI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ChangePasswordResponseI> = await AxiosInstance.post(`/user/change-password`, {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      });

      showFlashMessage({ type: "success", message: `${response.data.result.result}` });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });
      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const contactUsService: any = createAsyncThunk(
  "auth/contactUsService",
  async (payload: ContactUsI, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ContactUsResponseI> = await AxiosInstance.post(`/user/contact-us`, {
        name: payload.name,
        email: payload.email,
        message: payload.message,
      });

      return response.data;
    } catch (error: any) {
      showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });

      return rejectWithValue(error?.response?.data || "Something went wrong!");
    }
  }
);

export const deleteMyProfileService: any = createAsyncThunk("auth/deleteMyProfile", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<deleteMyProfileResponseI> = await AxiosInstance.delete(`/user/me`);

    return response.data;
  } catch (error: any) {
    showFlashMessage({ type: "danger", message: `${error?.response?.data?.message || "Something went wrong!"}` });
    return rejectWithValue(error?.response?.data || "Something went wrong!");
  }
});
