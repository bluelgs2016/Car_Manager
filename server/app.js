require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs")
const path = require("path")
const morgan = require("morgan");

const logger = require("./config/winston");
const router = require("./routes")

const CLIENT_HOST = process.env.CLIENT_HOST
const HTTP_PORT = process.env.HTTP_PORT
const HTTPS_PORT = process.env.HTTPS_PORT
const NODE_ENV = process.env.NODE_ENV

const combined =
':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = NODE_ENV !== "production" ? "dev" : combined;

const app = express()

app.use(cors({
  origin: [CLIENT_HOST, "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
}))

app.set('trust proxy',true) // ip주소를 가져올 때 req.ip가 프록시 뒤에 있더라도 실제 ip 주소를 반환한다.
app.use(cookieParser()); // cookie를 자동으로 파싱하여 req.cookies객체에 담아준다. 유효기간이 지난 쿠키는 알아서 걸러준다.
app.use(express.json({limit:"10mb"})); // express 4.16부터는 body-parser를 포함하고 있다. limit를 설정하지 않으면 body가 큰 경우 오류가 난다.
app.use(morgan(morganFormat, { stream: logger.stream })); // morgan 로그 설정
app.use("/static",express.static("public")); //클라이언트에서 정적파일에 접근할 수 있도록 경로설정을 하는 것이다. 
app.use(express.static(path.join(__dirname,"build")))

app.use("/api", router);
app.use("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

let server;

if (NODE_ENV === "development") { //개발모드 일 경우 서버 실행(HTTP or HTTPS)
  if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem") && HTTPS_PORT) {
    const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
    const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
    const credentials = { key: privateKey, cert: certificate };
    server = https.createServer(credentials, app);
    server.listen(HTTPS_PORT,'0.0.0.0', () => {
      logger.info(`Server is running on port ${HTTPS_PORT} by Local_HTTPS.`);
    });
  } else {
    server = app.listen(HTTP_PORT, '0.0.0.0',() => {
      logger.info(`Server is running on port ${HTTP_PORT} by Local_HTTP.`);
    });
  }
} else {//개발모드가 아닐 경우 HTTPS로만 실행되도록 설정. HTTP로 실행되도록 하려면 재정의가 필요하다.
  const ssl_options = {
    ca: fs.readFileSync("/etc/letsencrypt/live/engletest.ga/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/engletest.ga/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/engletest.ga/cert.pem"),
  };
  server = https.createServer(ssl_options, app);
  server.listen(HTTPS_PORT, '0.0.0.0',() => {
    logger.info(`Server is running on port ${HTTPS_PORT} by EC2_HTTPS.`);
  });
}