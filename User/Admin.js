var db = require("../database");
var User = require("./user");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  db.usersDB[this.id].isAdmin = this.isAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUsers = function() {
  var userArray = [];
  var len = db.usersDB.length;

  for (var i = 0; i < len; i++) {
    userArray.push(db.usersDB[i]);
  }
  console.log("Users read successfully", userArray);

  return userArray;
};

module.exports = Admin;
