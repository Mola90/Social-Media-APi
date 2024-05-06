const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require("../models");

//create user


module.exports = {
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err) {
            res.status(500).json(err);
        };
    },
    
    //delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if (!user) {
                return res.status(404).json({message: "No such User"});
            }        

            res.json({message: user + "Deletd"});
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
          }

    },    // update user
    async updateuser (req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true},
            );
            if(!user){
                res.status(404).json({message: "No user with this ID"})
            }
            res.json(user);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    },
        // get all Users
        async getUser(req, res){
            try{
                const user = await User.find().populate("thoughts", "friends");
                res.json(user);
            }catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
    },
            //get single User
        async getSingleUser(req, res){
        try{
            const user = await User.findOne({_id: req.params.userId}).populate("thoughts", "friends");
            console.log(user);
            if(!user) {
                res.status(404).json({message: "no User found"});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
        return res.status(500).json(err);
      }
    },
    //add a friend
    async addfriend (req, res){
        try {
            console.log(req);

            const friend = await User.findByIdAndUpdate(
              req.params.friendId, 
              { $push: { friends: req.body._id } });
              console.log(friend);
            res.json(friend);  
            }catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
    },
    // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { reactions: { _id: req.params.friendId } } },
        { runValidators: true, new: true }
      );
      

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No though found with that ID :(' });
      }

      res.json(friend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },



};
