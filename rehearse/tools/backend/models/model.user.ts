import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

/**
 * modele de l'utilisateur pour la base de données mongodb
 * @typedef {Object} User
 * @property {string} name
 * @property {string} password
 * @property {string} email
 * @property {string} profile
 */
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);
export default UserModel;