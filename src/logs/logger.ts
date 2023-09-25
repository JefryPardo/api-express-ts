import { createLogger,format, transports } from "winston";
import date from 'date-and-time';

const now  =  new Date();
const nombreFile = date.format(now,'YYYY-MM-DD');
const logger = createLogger({

    format: format.combine(format.simple()),
    transports: [

        new transports.File({

            maxsize:    5120000,
            maxFiles:   20,
            filename:   `${__dirname}/${nombreFile.concat('.log')}`
        }),

        new transports.Console({
            level: 'debug',
        })
    ]
});

export { logger };