var express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
var mongoose = require('mongoose')
mongoose.set('strictQuery', false) // this is used to get rid of the depriciation warning which says that a particular function has been removed while developing further

const app = express() //  Calls the express function "express()" and puts new Express application inside the app variable
app.use(bodyParser.json()) // basically tells the system that you want json to be used. 

// JSON ->  Used for transmitting data in web applications , (Java script orinted notation)

app.use(express.json())
app.use(express.static('static')) // yaha pe sara static that i.e index.html or css ye sb rakha hai in the public directory


// Body-parser- > middleware for parsing(resolving the request bodies into it's components) bodies from URL.
// The extended option allows to choose between parsing(resolving the request) into the URL-encoded data with the querystring library (when false) or the qs library (when true)
app.use(bodyParser.urlencoded({
    extended: true
}))

// To be simple, querystring cannot parse nested object.
// Instead, it will be presented in '[]' format.
// While qs can be parsed in nested object.

// What is nested object in JSON?
// Objects can be nested inside other objects

// Body-parser is the Node. js body parsing middleware. It is responsible for resolving the request bodies into it's components in a middleware before you handle it.


// CONNECTING TO THE DATABASE
mongoose.connect("mongodb://localhost:27017/SRMDYNAMIC", {
    useNewUrlParser: true, //  useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
    
    useUnifiedTopology: true
    // The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new topology engine: AUTORECONNECT.
    // Topology is the arrangement with which computer systems or network devices are connected to each other
})

var db = mongoose.connection


db.on('errors', () => {
    console.log("Error in the connection to the database")
}) // this is basically for errors

db.once('open', () => {
    console.log("Connceted to the database")
})
// db.once --> Once when the mongoose connection is made with the db the event will occur.

// pug specific stuff
app.set('view engine', 'pug'); // This is for hbs 
app.set('views', path.join(__dirname, 'views'))// set the views directory

// ROUTING

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
}) 

app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
}).listen(3000)

app.get("/about",(req,res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get("/placement",(req,res)=>{
    const params = {}
    res.status(200).render('placement.pug', params);
})
app.get("/campuslife",(req,res)=>{
    const params = {} // render me jo parameter daloge wo return kr dega
    res.status(200).render('campuslife.pug', params);
})
app.get("/suss",(req,res)=>{
    const params = {}
    res.status(200).render('suss.pug', params);
})
console.log("Lisitng on port 3000")

app.post("/contact", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var phno = req.body.phno
    var address = req.body.address
    
    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "address": address
    }
    
    // ye usersSRM ek collection bn jayega database me 
    db.collection('userSRM').insertOne(data, (err, collection) => {
        if (err) {
            throw err
        }
        console.log("Record Saved")
    })
    const params = {}
    return res.status(200).render('suss.pug', params);
    
})
/*
What is an API with example?
APIs are mechanisms that enable two software components to communicate with each other using a set of definitions and protocols
/*
FEW THINGS ABOUT CORS(CROSS ORIGIN RESOURCE SHARING)

1. Only Resources from same domain,host and port can interact with each  other.

2.  CORS enables the website to recive the resouces form the servers that doesn't share it's domain,host and port

3. ye * basically tells that the api is whiltelisted from the same - origin poilicy

*/