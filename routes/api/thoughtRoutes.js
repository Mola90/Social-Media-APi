const router = require('express').Router();
const {addThought, 
      delteThought, 
      updateThought, 
      getThoughts, 
      getSingleThought, 
      addReaction, 
      removeReaction} = require("../../controllers/thoughtcontroller");


router.route("/").get(getThoughts).post(addThought);  

router.route("/:thoughtid").get(getSingleThought).delete(delteThought).put(updateThought);

router.route("/:thoughtid/reaction/:reactionId").post(addReaction).delete(removeReaction);

