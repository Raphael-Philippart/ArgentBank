import {z} from 'zod';

const userSchema = z.object({
  email: z.string().email().describe("E-mail de l'utilisateur"),
  password: z.string().describe("Mot de passe de l'utilisateur"),
  firstName: z.string().describe("Prénom de l'utilisateur"),
  lastName: z.string().describe("Nom de famille de l'utilisateur"),
});

const loginSchema = z.object({
  email: z.string().email().describe("E-mail de l'utilisateur"),
  password: z.string().describe("Mot de passe de l'utilisateur"),
});

const apiResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    token: z.string().describe("Jeton d'authentification"),
  }).optional(),
});

const loginResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    token: z.string().describe("Jeton d'authentification"),
  }),
});

const userProfileSchema = z.object({
  firstName: z.string().describe("Prénom de l'utilisateur"),
  lastName: z.string().describe("Nom de famille de l'utilisateur"),
});

export {
  userSchema,
  loginSchema,
  apiResponseSchema,
  loginResponseSchema,
  userProfileSchema
}
