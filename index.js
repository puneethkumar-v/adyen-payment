const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const PORT = 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(cors());
app.use(bodyParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("HELLO");
})

app.use("/", require("./routes/payment"));

app.listen(PORT, () => {
    console.log("SERVER RUNNING ON", PORT);
})