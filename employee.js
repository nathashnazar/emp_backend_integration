const mongoose = require("mongoose");


const schema = mongoose.Schema;

const employeeSchema = new schema({
    name: String,
    location: String,
    position: String,
    salary: Number


})

const employeeModel = mongoose.model("employees", employeeSchema); //for atlas need prural form

module.exports = employeeModel;