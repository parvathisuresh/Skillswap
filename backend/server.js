const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

let requests = [
    { id: 1, name: "Li Wei" },
    { id: 2, name: "Jordan Smith" }
];

app.get("/api/requests", (req, res) => {
    res.json(requests);
});

app.post("/accept/:id", (req, res) => {
    const id = parseInt(req.params.id);
    requests = requests.filter(r => r.id !== id);
    res.json({ message: "Accepted" });
});

app.post("/decline/:id", (req, res) => {
    const id = parseInt(req.params.id);
    requests = requests.filter(r => r.id !== id);
    res.json({ message: "Declined" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});