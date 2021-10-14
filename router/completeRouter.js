const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const loginController = require("../controller/loginController");

router.post(`/user/login`,urlencodedParser, loginController.login);
router.post(`/createUser`,urlencodedParser, loginController.createUser);
router.post(`/validate`,urlencodedParser,loginController.validate);
router.post(`/delete`,urlencodedParser,loginController.delete);

router.get(`/getUsers`,loginController.getUser);

module.exports = router;