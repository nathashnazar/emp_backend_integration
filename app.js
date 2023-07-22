// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const employeeModel = require("./employee.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));


// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://Scram_003:BfHO1zJV0Kb9mi0V@cluster0.5jg9gn4.mongodb.net/employeeDB?retryWrites=true&w=majority")

    .then(() => {
        console.log("mongodb is connected successfully");

    })
    .catch((err) => {
        console.log("mongodb not connected" + err);
    });


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist", async (req, res) => {
    try {
        const data = await employeeModel.find();
        console.log("data from get api or frontend= ", data);
        res.send(data);
    }


    catch (e) {
        console.log(`get error occured ${e}`);
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id", async (req, res) => {
    try {
        const data = await employeeModel.findById(req.params.id);
        console.log("data from get api with id or frontend= ", data);
        res.send(data);
    }
    catch (e) {
        console.log(`get single api error occured ${e}`);
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post("/api/employeelist", async (req, res) => {
    try{
        const item = req.body;
        console.log("data from postman or frontend=", item);
        const user = new employeeModel(item);
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (e) {
        console.log(`post error occured ${e}`);
    }
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
    try {
        const data = await employeeModel.deleteOne({ "_id": req.params.id })
        console.log("data from delete api or frontend= ", data);//to view in terminal
        res.send(data);//to view in postaman
    }
    catch (e) {
        console.log(`delete error occured ${e}`);
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {

    try {
        const data = await employeeModel.findByIdAndUpdate(
            {
                "_id": req.body._id,
            },
            {
                $set: {
                    "name": req.body.name,
                    "location": req.body.location,
                    "position": req.body.position,
                    "salary": req.body.salary
                }
            }
        );

        console.log("data from put api or frontend= ", data);
        res.send(data);


    }
    catch (e) {
        console.log(`update error occured ${e}`);
    }

})



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000, () => {
    console.log("server connected to port number 3000");
});



