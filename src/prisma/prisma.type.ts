import type { PrismaService } from './prisma.service';
// TODO Parameters 공부 필요
type PrismaTxType = Parameters<Parameters<PrismaService['$transaction']>[0]>[0];

export { PrismaTxType };
