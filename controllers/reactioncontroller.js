const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require("../models");

//create reaction

module.exports = {
    async createReaction(req, res){
        try{
            const reaction = await Reaction.create(req.body);
            res.json(reaction);
        }catch (err) {
            res.status(500).json(err);
        };
    },
    
    //delete Reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndRemove({_id: req.params.reseactionId});

            if (!Reaction) {
                return res.status(404).json({message: "No such Reaction"});
            }        

            res.json({message: reaction + "Deletd"});
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
          }

    },     
};
