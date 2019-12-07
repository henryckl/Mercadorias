const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
