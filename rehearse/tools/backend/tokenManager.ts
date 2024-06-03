const jwt = require("jsonwebtoken");
import UserModel from "./models/model.user";

/**
 * crée un token JWT en utilisant l'adresse e-mail de l'utilisateur
 * comme donnée encodée. Le token est signé avec une clé secrète définie dans
 * les variables d'environnement.
 *
 * @param {string} email - L'adresse e-mail de l'utilisateur pour lequel le token est généré.
 * @returns {string} Le token JWT généré.
 */
export const tokenMaker = (email: string): string => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  return token;
};

/**
 * Vérifie l'authenticité d'un token JWT et s'assure qu'il corresponde à l'adresse e-mail
 *
 * @param {string} token - Le token JWT à vérifier.
 * @param {string} [userMail] - (Optionnel) Une adresse e-mail spécifique à vérifier contre l'e-mail extrait du token.
 * @returns {Promise<boolean>} `true` si le token est valide (et, le cas échéant, correspond à l'adresse e-mail), sinon `false`.
 */
export const tokenChecker = async (token: string, userMail: string): Promise<boolean> => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const decodedMail = decodedToken.email;
    let userToCheck = await UserModel.findOne({email: decodedMail});
    if (!userToCheck) {
        throw new Error("tokenChecker ~> user introuvable");
    }
    if (userMail && decodedMail != userMail) {
        throw new Error("tokenChecker ~> le mail rentré en paramètre ne corespond pas au mail de l'utilisateur authentitfié. Requète rejeté.")
    }
    console.log(`tokenChecker ~> utilisateur authentifié : ${userMail}`);
    return true;
  } catch (error) {
    console.log("tokenChecker ~>", error);
    return false;
  }
};