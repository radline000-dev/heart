const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const ErrorResponse = require("./utils/errorResponse");

/** Routing Import */
const users = require("./routes/users");

// 환경 변수 적용
dotenv.config({ path: "./config/config.env" });

//express 생성
const app = express();

//DB 실행
connectDB();
// Body json
app.use(bodyParser.json());

app.use(fileupload());
//정적 폴더 설정
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/** API Mapping */
app.use("/api/users", users);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
//서버 오픈
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Not open ");
  } else {
    console.log(`Server Open Port : ${PORT}`);
  }
});
