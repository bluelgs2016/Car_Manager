const winston = require('winston') ;
const winstonDaily = require('winston-daily-rotate-file');
const dayjs = require("dayjs")
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc)
dayjs.extend(timezone)
const { combine, timestamp, printf, colorize } = winston.format;

const logDir = 'logs';  // logs 디렉토리 하위에 로그 파일 저장

const logFormat = printf(info => {
    const newTime = dayjs(info.timestamp).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
    return `${newTime} ${info.level}: ${info.message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`, // file 이름 날짜로 저장
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true, 
        }),
      	// warn 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+ '/warn',
            filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true, 
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

logger.stream = {// morgan wiston 설정
    write: message => {
        logger.info(message);
    }
} 

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
// winston logger의 내용을 console.log로 출력하기 위해 설정하는 것(nodemon devtools창과는 다름)

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
            logFormat // log format 적용
        )
    }));
}

module.exports = logger;