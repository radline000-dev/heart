const express = require("express");

const {
  getUsers,
  createUser,
  loginUser,
  getUser,
} = require("../controllers/users");

//Router Setting
const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
//회원가입, 로그인
router.route("/register").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
