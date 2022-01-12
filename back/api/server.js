const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { json } = require("stream/consumers");
// const stream = require('stream');

const app = express();


app.use(cors());
//setup express app
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//require database
const db = require("./app/models")
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// //test home page
// app.get("/", (req, res) => {
//     res.send("Welcome to test PERN app.");
// });

require("./app/routes/headline.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})
