const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require("../models");

module.exports = {
    //create thoughts
    async addThought (req, res){
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);  
            }catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
    },
    // delete thought
    async delteThought(req, res){
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thought.Id})

            if(!thought) {
                res.status(404).json({message: "no thought found"});
            }
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // updTE THOUGH
    async updateThought (req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true},
            );
            if(!thought){
                res.status(404).json({message: "No thought with this ID"})
            }
            res.json(thought);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    },
    // get all thoughts
    async getThoughts(req, res){
        try{
            const thought = await Thought.find().populate("username");
            res.json(thought);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate("username");

            if(!thought) {
                res.status(404).json({message: "no thought found"});
            }
            res.json(thought);
        } catch (err) {
        res.status(500).json(err);
      }
    },
    // Add an reaction to a thought
  async addReaction(req, res) {
  

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove though from a user
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { ReactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },




};