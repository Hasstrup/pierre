import pino, { LoggerOptions } from 'pino';

import { Config } from '@/shared/types';

const REDACTED_FIELDS = [
  'headers.authorization',
  '*.password',
  '*.currentPassword',
  '*.newPassword',
];

/**
 * Creates the global logger instance
 */
const createLogger = (config: Config) => {
  const pinoOptions: LoggerOptions = {
    name: config.LOG_NAME,
    level: config.LOG_LEVEL,
    redact: {
      paths: REDACTED_FIELDS,
      censor: 'REDACTED',
    },
  };

  if (config.NODE_ENV === 'development') {
    pinoOptions.prettyPrint = {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss.l',
      ignore: 'pid,hostname',
    };
  }

  return pino(pinoOptions);
};

export default createLogger;
