const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const PORT = 5000;


app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
    res.send("HELLO");
})

app.use("/", require("./routes/payment"));

app.listen(PORT, () => {
    console.log("SERVER RUNNING ON", PORT);
})