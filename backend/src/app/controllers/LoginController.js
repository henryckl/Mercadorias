const User = require("../models/User");

module.exports = {
  async store(req, res) {
    //Login a registered user
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res
          .status(401)
          .send({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
