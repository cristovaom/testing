import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(message);
    // aqui da pra escolher o local que vai salvar as logs, lidar com elas ou enviar pra alguma biblioteca de monitoramente (que o lambe sal não quer).
  }

  error(message: string, trace: string) {
    console.error(message, trace);
  }
}