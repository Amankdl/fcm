const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "Please Enter Your Name"]
    }
})
module.exports = mongoose.model("tokens", tokenSchema);