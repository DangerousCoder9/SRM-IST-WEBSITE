// var express = require('express')
// var bodyParser = require('body-parser')
// var mongoose = require('mongoose')
// mongoose.set('strictQuery', false);

// const app = express()

// app.use(bodyParser.json())
// app.use(express.static('public')) // Yaha pe index wala file milega in public directory

// app.use(bodyParser.urlencoded({
//     extended: true
// }))

// // Connecting to the database 
// mongoose.connect("mongodb://localhost:27017/SRM", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// var db = mongoose.connection;

// db.on('error', () => {
//     console.log("Error in connecting to the database")
// })

// db.once('open', () => {
//     console.log("Connected to the datasbe")
// })


// // ROUTING


// app.post("/fill", (req, res) => {
//     var name = req.body.name;
//     var email = req.body.email;
//     var phno = req.body.phno;
//     var address = req.body.address;

//     var data = {
//         "name": name,
//         "email": email,
//         "phno": phno,
//         "address": address,
//     }

//     db.collection('users').insertOne(data, (err, collection) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Saved to the database")
//     })

//     return res.redirect('suss.html')

// })


// app.get("/contact", (req, res) => {
//     res.set({
//         "ALLOW-access-ALLOW-Origin": '*'
//     })
//     return res.redirect('return.html')
// }).listen(4000)

// console.log("Listing to the port 4000")