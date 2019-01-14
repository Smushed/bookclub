var express = require("express");
const exphbs = require(`express-handlebars`);
var app = express();

var PORT = process.env.PORT || 3000;

//Set Up for handlebars
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require(`./routes/apiRoutes`)(app);
require(`./routes/htmlRoutes`)(app);

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});