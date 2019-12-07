const mongoose = require("mongoose");
const dbConfig = require("../config/database");
mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
