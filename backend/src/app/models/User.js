const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "E-mail inválido" });
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      default: "user"
    },
    tokens: [
      {
        token: {
          type: String,
          unique: true
        }
      }
    ]
  },
  { timestamps: true }
);

// Hash a senha antes de salvar
UserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Gera um token para o usuario
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//busca um usuario por email e senha
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: "e-mail nao registrado" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: "senha invalida" });
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
