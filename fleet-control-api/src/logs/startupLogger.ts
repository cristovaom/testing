import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class StartupLogger {
  private readonly logger = new Logger('StartupLogger');
  private readonly logFileName = 'startup-logs.txt'; // Nome do arquivo de log de inicialização

  log(message: string) {
    this.writeLog(message);
  }

  error(message: string, trace: string) {
    this.writeLog(`[ERROR] ${message} - ${trace}`);
  }

  warn(message: string) {
    this.writeLog(`[WARN] ${message}`);
  }
  private writeLog(message: string) {
    fs.appendFile(this.logFileName, `${message}\n`, (err) => {
      if (err) {
        console.error(
          `Erro ao escrever no arquivo de log de inicialização: ${err.message}`,
        );
      }
    });
  }
}
