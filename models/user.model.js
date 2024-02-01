const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// schema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

// Encrypt password using bcrypt (PreMethod will work before creating new user)
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  const saltRound = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(user.password, saltRound);
  user.password = hashedPassword;
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Json Web Token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        isAdmmin: this.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
