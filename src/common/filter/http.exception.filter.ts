import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponseDto } from '../dto/res.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // TODO 상태코드에 따라 에러 로그 다르게 찍어야 하나? 여기 대부분 400번대 에러 들어올 것
    this.logger.error(
      `상태코드: ${status} url: ${request.url} message: ${exception.message} \n 요청: ${JSON.stringify(request.body)}`,
    );

    const httpResponse = new HttpResponseDto(false, null, {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });

    response.status(status).json(httpResponse);
  }
}
