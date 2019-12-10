const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    //Login a registered user
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        console.log("error");
        throw new Error({ error: "e-mail nao registrado" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatch);
      if (!isPasswordMatch) {
        throw new Error({ error: "senha invalida" });
      }

      const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      user.tokens = user.tokens.concat({ token });
      console.log(token);
      await user.save();
      res.json({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
