const express = require(`express`);
const exphbs = require(`express-handlebars`);
const app = express();
require(`dotenv`);

//Setting up passport
const passport = require(`passport`);
const session = require(`express-session`);
const flash = require("connect-flash");
var cookieParser = require('cookie-parser');

//Setting up mongoose
const mongoose = require(`mongoose`);
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/bookClub`;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const PORT = process.env.PORT || 3000;

//Set Up for handlebars
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Setting up passport with express
app.use(session({ secret: 'First Blood' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash())

//Load passport strategies
require('./handlers/passport.js')(passport);

require(`./routes/apiRoutes`)(app);
require(`./routes/htmlRoutes`)(app);
require("./routes/passportRoutes")(app, passport);

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});