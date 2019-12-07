require("./database/db");

const App = require("./app");
const port = process.env.PORT;

App.listen(port);
