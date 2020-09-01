import { Logger } from '@qlean/nestjs-logger';
import { BaseException, InternalException } from '@qlean/nestjs-exceptions';

export function prepareError(logger: Logger, name: string) {
  return err => {
    let code;
    let message;
    let detail;

    if (/(\d+)\s(\S+):\s(.+)/.test(err.message)) {
      [, code, message, detail] = err.message.match(/(\d+)\s(\S+):\s(.+)/);
    }

    if (/(\d+)\sundefined:\s(\S+)\s-\s(.+)/.test(err.message)) {
      [, code, message, detail] = err.message.match(
        /(\d+)\sundefined:\s(\S+)\s-\s(.+)/,
      );
      // Вырезаем первую строку в мультистрочном тексте
      detail = detail + err.message.replace(/(.+)/, '');
    }

    if (code && message && detail) {
      const error = new BaseException(detail, {
        code: Number.isFinite(+code) ? +code : code,
        message,
      });
      logger.error(error);
      throw error;
    }

    logger.error(err);
    throw new InternalException(
      `External "${name}" service returned an error, try again later`,
    );
  };
}
