import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  private readonly logFileName = 'logs.txt'; // Nome do arquivo de log

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, ip, hostname } = request;

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;

      const message = `O Host: ${hostname}, usando o método: ${method}, no ip: ${ip} com a url: ${originalUrl} obteve o statuscode: ${statusCode} e a mensagem ${statusMessage}\n`;

      // Escrever a mensagem de log no arquivo
      fs.appendFile('./logs.txt', message, (err) => {
        if (err) {
          this.logger.error(
            `Erro ao escrever no arquivo de log: ${err.message}`,
          );
        } else {
          this.logger.log(`Log escrito com sucesso: ${message}`);
        }
      });
    });

    next();
  }
}

export default LogsMiddleware;
