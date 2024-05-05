const { Schema, model, default: mongoose } = require("mongoose");
const Reaction = request("./reactions");

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
        reactions: [Reaction],
    }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;