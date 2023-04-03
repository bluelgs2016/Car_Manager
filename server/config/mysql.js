require("dotenv").config();
const mysql = require("mysql2/promise");
const logger = require("./winston");

const config = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB || "EngleMining",
  port: process.env.MYSQL_PORT || 3306,
  multipleStatements: true, // 여러개의 쿼리문을 한번에 처리하기 위해 필요
  waitForConnections: true, // pool이 모두 사용중일 경우 기다릴 것인지(true), 오류를 보낼 것인지(false)
  connectionLimit: 10, // pool의 최대치, 기본값은 10
  queueLimit: 0, // waitForConnections가 true일 경우 que에 넣을 최대치. 기본값 0이며 0일 경우 제한 없음.
  timezone: "+09:00", // 기준시각을 맞추기 위해서 필요한 설정. 정확한 이해가 필요하다.
};

// // mysql pool을 사용하지 않는 경우 connect, query, end 필요 -------
// const db_noPool = mysql.createConnection(config);
// db_noPool.connect();
// db_noPool.query("show tables", (err, result) => {
//   if (err) throw err;
//   console.log(result);
// });
// db_noPool.end();
// // ---------------------------

// 트랜젝션의 사용을 위해 pool을 사용한다.
pool = mysql.createPool(config);
const db = async (queryString, params) => {
  try {
    const con = await pool.getConnection(async (conn) => conn); //커넥션 열기
    try {
      await con.beginTransaction(); //트랜젝션을 시작
      const [rows] = await con.query(queryString, params);
      await con.commit(); //트랜젝션 종료. 커밋
      return rows;
    } catch (err) {
      // console.log("Query Error: " + err);
      logger.error("Query Error: " + err);
      await con.rollback(); //트랜젝션 종료. 롤백
      return false;
    } finally {
      con.release(); //커넥션 닫기
    }
  } catch (err) {
    // console.log("DB Error: " + err);
    logger.error("DB Error: " + err);
    return false;
  }
};


module.exports = db;
