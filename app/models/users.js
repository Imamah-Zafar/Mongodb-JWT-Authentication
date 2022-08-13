import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  password: String,
  is_active: { type: Boolean, default: false },
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
