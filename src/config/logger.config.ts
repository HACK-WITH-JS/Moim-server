import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

// Winston 로깅 관련 설정
// main.ts에서 App생성시 같이 들어갈 데이터
// TODO 로그 파일 관리 전략(파일저장소 시각화..) 설정 필요함
export const LoggerConfig = {
  logger: WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.STAGE === 'prod' ? 'info' : 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike('Server', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  }),
};
