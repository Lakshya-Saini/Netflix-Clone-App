require("dotenv").config();

module.exports = {
  mongoURI:
    "mongodb+srv://Lakshya:Lakshya@ls273@netflix-clone-app.hhjqm.mongodb.net/NetflixClone?retryWrites=true&w=majority",
  secretOrKey: process.env.SECRET_OR_KEY,
};
