const router = require('express').Router();
const {createUser, 
    deleteUser, 
    updateuser, 
    getUser, 
    getSingleUser,
    addfriend,
    removeFriend} = require("../../controllers/usercontroller");



    router.route("/").get(getUser).post(createUser);

    router.route("/:userId").get(getSingleUser).delete(deleteUser);

    router.route("/update/:userId").put(updateuser);

    router.route("/addfriend/:friendId").put(addfriend);

    router.route("/removefriend/:UsertId/:friendId").delete(removeFriend);



    
    module.exports = router;
