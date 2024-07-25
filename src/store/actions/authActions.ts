import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginResponseSchema, loginSchema, profileResponseSchema, userProfileSchema} from '../../schemas/authSchemas';
import {LoginType, UserProfile} from "../../types/types";
import {RootState} from '../index';
import {z} from "zod";

if (!process.env.REACT_APP_API_URL) {
  throw new Error('You need to set the API url in the .env file.');
}

const path = process.env.REACT_APP_API_URL;

/**
 * Extracts the error message from the API response.
 *
 * @param response - The response object from the fetch request.
 * @returns The error message as a string.
 */
const extractErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    console.log(response)
    if (data && typeof data === 'object' && 'message' in data) {
      return (data as { message: string }).message;
    }
    return 'An error occurred';
  } catch {
    try {
      const text = await response.text();
      return text || 'An error occurred';
    } catch {
      return 'An error occurred';
    }
  }
};

/**
 * Thunk for logging in a user.
 *
 * @param loginData - The login data to be sent to the API.
 * @param thunkAPI - The thunk API object provided by createAsyncThunk.
 * @returns The token received from the API if the login is successful.
 */
export const login = createAsyncThunk<
  { token: string },
  LoginType,
  { state: RootState; rejectValue: string }
>(
  'auth/login',
  async (loginData: LoginType, thunkAPI) => {
    try {
      // Validate login data with Zod
      loginSchema.parse(loginData);

      // Send login request
      const response = await fetch(`${path}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        // Extract and return the error message from the API response
        const errorMessage = await extractErrorMessage(response);
        return thunkAPI.rejectWithValue(errorMessage);
      }

      // Extract data from the response
      const data = await response.json();

      // Validate response data
      const parsedData = loginResponseSchema.parse(data);
      const { token } = parsedData.body;

      return { token };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => err.message).join(', ');
        return thunkAPI.rejectWithValue(`Validation error(s): ${errorMessages}`);
      }
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error');
      }
    }
  }
);


/**
 * Thunk for fetching the user profile.
 *
 * @param _ - No parameters are needed for this thunk.
 * @param thunkAPI - The thunk API object provided by createAsyncThunk.
 * @returns The user profile data if the fetch is successful.
 */
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

    try {
      const response = await fetch(`${path}/user/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await extractErrorMessage(response);
        return thunkAPI.rejectWithValue(errorMessage);
      }

      // Extract data from the response
      const data = await response.json();

      // Validate response data
      const parsedData = profileResponseSchema.parse(data);

      return parsedData.body;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Erreur inconnue');
      }
    }
  }
);

/**
 * Thunk for updating the user profile.
 *
 * @param userData - The user profile data to be sent to the API.
 * @param thunkAPI - The thunk API object provided by createAsyncThunk.
 * @returns The updated user profile data if the update is successful.
 */
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

    try {
      // Validate login data
      userProfileSchema.parse(userData);

      const response = await fetch(`${path}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Extract and return the error message
        const errorMessage = await extractErrorMessage(response);
        return thunkAPI.rejectWithValue(errorMessage);
      }

      // Extract data from the response
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error');
      }
    }
  }
);
