import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandService {
  constructor(private readonly prisma: PrismaService) {}

 async findByCode(code: string) {
  const stand = await this.prisma.stand.findUnique({
    where: { code },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: {
          options: {
            select: {
              id: true,
              text: true,
            },
          },
        },
      },
    },
  });

  if (!stand) throw new NotFoundException(`Stand con código ${code} no encontrado`);

  return stand;
}
}