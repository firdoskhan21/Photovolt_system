const constants = require('./config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const file = require("./routes/file.route");

const app = express();
const port = 5000;

const mongoDBUri = constants.mongoDBUri;

mongoose.connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error ? console.log(error) : console.log("MongoDB connected ... here:" + mongoDBUri));
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/file", file);

app.listen(port, () => {
    console.log(file)
    console.log("Server is starting ... here: localhost:" + port)
});