import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginResponseSchema, loginSchema} from '../../schemas/authSchemas';
import {LoginData, UserProfile} from "../../types/types";
import {RootState} from '../index';

if (!process.env.REACT_APP_API_URL) {
  throw new Error('You need to set the API url in the .env file.');
}

const path = process.env.REACT_APP_API_URL;

export const login = createAsyncThunk<
  { token: string },
  LoginData,
  { state: RootState; rejectValue: string }
>('auth/login', async (loginData: LoginData, thunkAPI) => {
  try {
    loginSchema.parse(loginData);

    const response = await fetch(`${path}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = (data as { message: string }).message;
      return thunkAPI.rejectWithValue(errorMessage);
    }

    const parsedData = loginResponseSchema.parse(data);
    const { token } = parsedData.body;

    return { token };
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Une erreur inattendue est apparue');
  }
});

export const fetchUserProfile = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      return thunkAPI.rejectWithValue("Vous devez être authentifié.");
    }

    const response = await fetch(`${path}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = (data as { message: string }).message;
      return thunkAPI.rejectWithValue(errorMessage);
    }

    return data.body;
  }
);

export const updateUserProfile = createAsyncThunk<
  any,
  UserProfile,
  { rejectValue: string }
>(
  'auth/updateUserProfile',
  async (userData, thunkAPI) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    const response = await fetch(`${path}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Failed to update user profile');
    }

    const data = await response.json();
    return data;
  }
);
