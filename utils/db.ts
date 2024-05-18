

import { PrismaClient } from "@prisma/client";

const prismaClient = () => new PrismaClient();

type PrismaClientType = ReturnType<typeof prismaClient>;

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClientType | undefined;
}

const prisma = globalPrisma.prisma ?? prismaClient();

export default prisma;


if(process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;