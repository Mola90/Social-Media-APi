const { Schema, model } = require("mongoose");
const validator = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: string,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: string,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function(email) {
                  return validator.isEmail(email);
                },
                message: 'Invalid email address'
              }
        },
        thoughts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thought",
        },
        friends: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },      
    }
);

const User = model("User", userSchema);

module.exports = {User};