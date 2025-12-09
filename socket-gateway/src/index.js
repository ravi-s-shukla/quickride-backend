import express from "express";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
    res.send("Socket Gateway");
});

app.listen(4000, () => {
    console.log("Socket Gateway running on port 4000");
});