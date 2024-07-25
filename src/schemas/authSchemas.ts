import {z} from 'zod';

/**
 * Schéma de validation pour les données utilisateur.
 *
 * @property {string} email - E-mail de l'utilisateur, doit être une adresse e-mail valide.
 * @property {string} password - Mot de passe de l'utilisateur.
 * @property {string} firstName - Prénom de l'utilisateur.
 * @property {string} lastName - Nom de famille de l'utilisateur.
 */
const userSchema = z.object({
  email: z.string().email().describe("E-mail de l'utilisateur"),
  password: z.string().describe("Mot de passe de l'utilisateur"),
  firstName: z.string().describe("Prénom de l'utilisateur"),
  lastName: z.string().describe("Nom de famille de l'utilisateur"),
});

/**
 * Schéma de validation pour les données de connexion.
 *
 * @property {string} email - E-mail de l'utilisateur, doit être une adresse e-mail valide.
 * @property {string} password - Mot de passe de l'utilisateur.
 */
const loginSchema = z.object({
  email: z.string().email().describe("E-mail de l'utilisateur"),
  password: z.string().describe("Mot de passe de l'utilisateur"),
});

/**
 * Schéma de validation pour la réponse de profil utilisateur.
 *
 * @property {number} status - Code de statut de la réponse.
 * @property {string} message - Message de la réponse.
 * @property {object} body - Corps de la réponse contenant les informations de l'utilisateur.
 * @property {string} body.id - Identifiant de l'utilisateur.
 * @property {string} body.createdAt - Date de création de l'utilisateur.
 * @property {string} body.updatedAt - Date de mise à jour de l'utilisateur.
 * @property {string} body.email - E-mail de l'utilisateur, doit être une adresse e-mail valide.
 * @property {string} body.firstName - Prénom de l'utilisateur.
 * @property {string} body.lastName - Nom de famille de l'utilisateur.
 */
const profileResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    id: z.string(),
    createdAt: z.string().describe("Date de création de l'utilisateur"),
    updatedAt: z.string().describe("Date de mise à jour de l'utilisateur"),
    email: z.string().email().describe("E-mail de l'utilisateur"),
    firstName: z.string().describe("Prénom de l'utilisateur"),
    lastName: z.string().describe("Nom de famille de l'utilisateur"),
  }),
});

/**
 * Schéma de validation pour la réponse de connexion.
 *
 * @property {number} status - Code de statut de la réponse.
 * @property {string} message - Message de la réponse.
 * @property {object} body - Corps de la réponse contenant le jeton d'authentification.
 * @property {string} body.token - Jeton d'authentification reçu lors de la connexion.
 */
const loginResponseSchema = z.object({
  status: z.number().describe("Code de statut"),
  message: z.string().describe("Message de la réponse"),
  body: z.object({
    token: z.string().describe("Jeton d'authentification"),
  }),
});

/**
 * Schéma de validation pour le profil utilisateur.
 *
 * @property {string} firstName - Prénom de l'utilisateur, doit contenir au moins deux caractères.
 * @property {string} lastName - Nom de famille de l'utilisateur, doit contenir au moins deux caractères.
 */
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
