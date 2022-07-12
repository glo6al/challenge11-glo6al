const express = require("express");
const app = express();

//define port number of the server
const PORT = process.env.PORT || 3001;

//import api and html routes
const apiRoutes = require("./");

//add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Use apiRoutes
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
