const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const favLangs = [
    { name: "html", id: 1 },
    { name: "css", id: 2 },
    { name: "javascript", id: 3 },
    { name: "python", id: 4 },
];

app.get("/api/favlangs", (req, res) => {
    res.json({ lang: favLangs });
});

app.post("/api/add-lang", (req, res) => {
    const record = {
        name: req.body.record,
        id: uuidv4(),
    };
    favLangs.push(record);
    res.json({ status: "ok" });
});

app.listen(1337, () => {
    console.log("server started on port 1337");
});
