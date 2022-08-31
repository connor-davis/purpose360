import mongoose from "mongoose";
import UserSchema from "../../schemas/user.schema";

export default mongoose.model("User", UserSchema);
