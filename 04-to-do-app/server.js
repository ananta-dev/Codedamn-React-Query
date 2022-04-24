const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const favLangs = ["html", "css", "javascript", "python"];

app.get("/api/favlangs", (req, res) => {
    res.json({ lang: favLangs });
});

app.post("/api/add-lang", (req, res) => {
    const record = req.body.record;
    favLangs.push(record);
    res.json({ status: "ok" });
});

app.listen(1337, () => {
    console.log("server started on port 1337");
});
