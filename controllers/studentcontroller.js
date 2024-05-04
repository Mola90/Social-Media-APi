const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require("../models");

module.exports = {
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err) {
            res.status(500).json(err);
        };
    },
    
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

    },

    



};
