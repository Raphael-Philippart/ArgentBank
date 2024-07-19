import {z} from "zod";
import {
  apiResponseSchema,
  loginResponseSchema,
  loginSchema,
  userProfileSchema,
  userSchema
} from "../schemas/authSchemas";

export type User = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
