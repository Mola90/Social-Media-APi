const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require("../models");

module.exports = {
    //create thoughts
    async addThought (req, res){
        try {
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate(
              req.body.username, 
              { $push: { thoughts: thought._id } });
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
    // Add a reaction to a thought
  async addReaction(req, res) {
  

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Remove thought from a user
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No though found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },




};