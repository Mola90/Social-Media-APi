const { Schema, model, } = require("mongoose");
const reactionSchema = require("./reactions");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },        
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );
    
    // virtual property: gets reactions length
    thoughtSchema.virtual('reactionCount').get(function () {
      return this.reactions.length;
    });




const Thought = model("Thought", thoughtSchema);

module.exports = Thought;