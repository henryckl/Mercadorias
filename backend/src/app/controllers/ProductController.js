const Product = require("../models/Product");

module.exports = {
  async store(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
