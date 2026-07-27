import { Injectable, OnModuleInit, OnModuleDestroy }from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { join } from 'path';
import { pathToFileURL } from 'url';
import type { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private client!: PrismaClient;
    async onModuleInit() {
        const prismaModule = await import(
          pathToFileURL(join(process.cwd(), 'generated/prisma/client.ts')).href
        );
        const { PrismaClient } = prismaModule.default ?? prismaModule;
        const adapter = new PrismaPg({
          connectionString: process.env.DATABASE_URL,
        });
        this.client = new PrismaClient({ adapter });
        await this.client.$connect();
    }

    async onModuleDestroy() {
        await this.client.$disconnect();
    }

    get student() {
        return this.client.student;
    }

    $queryRaw<T = unknown>(
        strings: TemplateStringsArray,
        ...values: unknown[]
    ): Promise<T> {
        return this.client.$queryRaw<T>(strings, ...values);
    }

    $queryRawUnsafe<T = unknown>(query: string): Promise<T> {
        return this.client.$queryRawUnsafe<T>(query);
    }
}
