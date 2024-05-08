import { LogLevel } from '@nestjs/common/services/logger.service';

function getLogLevels(): LogLevel[] {
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

export default getLogLevels;
