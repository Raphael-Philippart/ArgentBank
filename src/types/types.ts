import {z} from "zod";
import {
  loginResponseSchema,
  loginSchema,
  profileResponseSchema,
  userProfileSchema,
  userSchema
} from "../schemas/authSchemas";

export type User = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type ProfileType = z.infer<typeof profileResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
