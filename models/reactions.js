const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: string,
            required: true,
            maxLength: 280,
        },
        username: {
            type: string,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },        
    }
);

const Reaction = model("Reaction", reactionSchema);

module.exports = {Reaction};