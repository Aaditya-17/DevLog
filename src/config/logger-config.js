const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const customformat = printf(({ level, message, timestamp, error }) => {
    return `${level} : ${message} : ${timestamp} : ${error}`;
});

const logger = createLogger({
    format: combine(
        timestamp({ format: "YYYY-MM_-DD HH:mm:ss" }),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "app.log" }),
    ],
});

module.exports = logger;
