const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    password: {
        type: "string",
        required: true,
    },
    verified: {
        type: "boolean",
        default: false,
    },
    verificationToken: String,
    addresses: [
        {
            name: String,
            mobileNo: String,
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            country: String,
            postalCode: String,
        },
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Order",
        },
    ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;