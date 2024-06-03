import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);
export default UserModel;