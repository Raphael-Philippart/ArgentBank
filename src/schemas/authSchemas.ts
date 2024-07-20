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

const profileResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    id: z.string(),
    createdAt: z.string().describe("Date de création de l'utilisateur"),
    updatedAt: z.string().describe("Date de mise à jours de l'utilisateur"),
    email: z.string().email().describe("E-mail de l'utilisateur"),
    firstName: z.string().describe("Prénom de l'utilisateur"),
    lastName: z.string().describe("Nom de famille de l'utilisateur"),
  }),
});

const loginResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    token: z.string().describe("Jeton d'authentification"),
  }),
});

const userProfileSchema = z.object({
  firstName: z.string()
    .min(2, "Le prénom doit contenir au moins deux caractères")
    .describe("Prénom de l'utilisateur"),
  lastName: z.string()
    .min(2, "Le nom de famille doit contenir au moins deux caractères")
    .describe("Nom de famille de l'utilisateur"),
});

export {
  userSchema,
  loginSchema,
  profileResponseSchema,
  loginResponseSchema,
  userProfileSchema
}
