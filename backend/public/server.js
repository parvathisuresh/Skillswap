const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/skillswap")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Register user
app.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        await user.save();
        res.send("User registered");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error registering user");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
// Add skills
app.post("/addSkills", async (req, res) => {

    const user = await User.findByIdAndUpdate(

        req.body.userId,

        {
            skillsTeach: req.body.skillsTeach,
            skillsLearn: req.body.skillsLearn
        },

        { new: true }

    );

    res.json(user);

});
// Find matches
app.post("/findMatch", async (req, res) => {

    const currentUser = await User.findById(req.body.userId);

    const matches = await User.find({

        skillsTeach: { $in: currentUser.skillsLearn },

        skillsLearn: { $in: currentUser.skillsTeach },

        _id: { $ne: req.body.userId }

    });

    res.json(matches);

});