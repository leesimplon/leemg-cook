const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const methodOverride = require('method-override')
const config = require('./config/database.config')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 8080;

const passport = require("passport");
//const users = require("./routes/route");
// ... other imports 
const path = require("path")




// ...

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(methodOverride('X-HTTP-Method')) 
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))
app.use(cors())
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ... other app.use middleware 
//app.use(express.static(path.join(__dirname, "client", "build")))

// Passport config
require("./config/passport/passport_cooker")(passport);
require('./routes/route')(app);
mongoose.Promise = global.Promise;
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");  
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Passport middleware
app.use(passport.initialize());

// Routes
//app.use("/api/users", users);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Cook app"});
});

// Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});