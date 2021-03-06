var db = require("../database");
var User = require("./User");
var Order = require("../Order/Order");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUsers = function() {
  console.log("Reading...");
  var len = db.users.length;
  if (len === 0) {
    console.log("Users DB is empty");
    return "Users DB is empty";
  }

  console.log("Users read successfully", db.users);

  return db.users;
};

Admin.prototype.deleteUser = function(name) {
  var foundUser = this.searchUser(name);
  if (foundUser) {
    console.log("User found");
    db.users.splice(foundUser.id, 1);
    console.log("User deleted");
    return name + " has been deleted";
  }
  console.log("Person does not exist");
  return "Person does not exist";
};

Admin.prototype.deleteAllUsers = function() {
  if (db.users.length === 0) {
    console.log("Users DB is already empty");
    return "No users presently";
  }
  db.users.length = 0;
  console.log("All users deleted");
  return "All users deleted";
};

Admin.prototype.readAllOrders = function() {
  console.log("Reading orders...");
  var orderArray = Order.readAll();
  return orderArray;
};

Admin.prototype.readOneOrder = function(id) {
  console.log("Reading...");
  var foundOrder = Order.readOne(id);
  if (foundOrder) {
    console.log("Order found");
    return foundOrder;
  }
  console.log("Order does not exist");
  return "Order does not exist";
};

Admin.prototype.editOrder = function(id, prop, info) {
  var result = Order.update(id, prop, info);
  if (result === "Only products can be edited") {
    console.log("Only products can be edited");
    return "Only products can be edited";
  } else if (result) {
    console.log("Order was updated");
    return result;
  } else {
    console.log("Order does not exist");
    return "Order does not exist";
  }
};

Admin.prototype.deleteOrder = function(id) {
  console.log("Deleting order...");
  var foundOrder = Order.deleteOne(id);
  if (foundOrder) {
    console.log("Order deleted");
    return "Order deleted";
  }
  console.log("Order not found");
  return "Order not found";
};

Admin.prototype.deleteAllOrders = function() {
  Order.deleteAll();
  return console.log("Order DB emptied");
};

module.exports = Admin;
