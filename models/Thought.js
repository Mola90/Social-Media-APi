const { Schema, model, default: mongoose } = require("mongoose");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: string,
            required: true,
            maxLength: 280,
            minLength: 1,
        },
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },        
        reactions: [reactionSchema],
    }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;