const router = require('express').Router();
const {createUser, 
    deleteUser, 
    updateuser, 
    getUser, 
    getSingleUser} = require("../../controllers/usercontroller");

    router.route("/").get(getUser).post(createUser);

    router.route("/:userId").get(getSingleUser).delete(deleteUser);

    router.route("/update/:userId").post(updateuser);

    module.exports = router;
