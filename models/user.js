const { Schema, model } = require("mongoose");
const validator = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        createdAt:{
            type: Date,
            default: Date.now,
        },      
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );
    
    // virtual property: gets friends length
    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    });






const User = model("User", userSchema);


module.exports = User;