import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prismaservice: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    // 데이터베이스에 대한 Ping Check를 수행한다.
    return this.health.check([
      () => this.db.pingCheck('mysql', this.prismaservice),
    ]);
  }
}
