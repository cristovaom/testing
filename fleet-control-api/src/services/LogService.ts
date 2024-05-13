import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('node:fs');

@Injectable()
export class LogService {
  async writeLog(message: string) {
    try {
      await fs.appendFile('logs.txt', `${message}\n`);
    } catch (error) {
      console.error('Erro ao escrever no arquivo de log:', error);
    }
  }
}
