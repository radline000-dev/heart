const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/** User Model Import */
const User = require("../models/User");

//@desc   전체 유저 정보 가져오기
//@route  GET /api/users
//@access Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    next(new ErrorResponse("Users data not found", 404));
  }
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

//@desc   유저 생성
//@route  POST /api/users/register
//@access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  if (!user) {
    next(new ErrorResponse("Register Not User", 400));
  }
  res.status(201).json({
    success: true,
    data: user,
  });
});

//@desc   유저 로그인
//@route  POST /api/users/login
//@access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    user_id: req.body.user_id,
    password: req.body.password,
  });
  if (!user) {
    next(
      new ErrorResponse("패스워드가 틀렸거나 아이디가 존재하지 않습니다.", 400)
    );
  }
  if (user.logging === "on") {
    user.logging = "off";
    await user.save();
    next(
      new ErrorResponse(
        "이미 로그인되어 있는 계정입니다. 로그아웃을 진행하였으니 다시 로그인 바랍니다.",
        400
      )
    );
  }
  user.logging = "on";
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc   개인 유저 조회
//@route  GET /api/users/:id
//@access Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new ErrorResponse(`${req.params.id} is not User Data`, 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

//todo 유저 갱신,

//todo 유저 삭제

//todo 로그아웃

//todo 친구등록

//todo 친구삭제
