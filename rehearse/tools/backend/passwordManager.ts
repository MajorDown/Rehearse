import bcrypt from "bcrypt";

/**
 * encrypte un mot de passe
 * @param {string} password
 * @returns {Promise<string>}
 */
export const passwordCrypter = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASH_TURNS));
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * compare un mot de passe avec un mot de passe crypté
 * @param {string} password
 * @param {string} hashedpassword
 * @returns {Promise<boolean>}
 */
export const passwordChecker = async (password: string, hashedpassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, hashedpassword);
  return isPasswordValid;
};