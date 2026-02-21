import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: { name: dto.name },
    });
  }

  async getProgress(id: string) {
  const player = await this.prisma.player.findUnique({
    where: { id },
    include: {
      playerStands: {
        include: {
          stand: {
            select: { code: true, title: true },
          },
        },
      },
    },
  });

  if (!player) throw new NotFoundException('Jugador no encontrado');

  return {
    id: player.id,
    name: player.name,
    totalPoints: player.totalPoints,
    seeds: player.seeds,
    completedStands: player.playerStands.map((ps) => ({
      standCode: ps.stand.code,
      standTitle: ps.stand.title,
      correctAnswers: ps.correctAnswers,
      seedEarned: ps.seedEarned,
    })),
    finished: player.seeds >= 3,
  };
}

  async findById(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
      include: {
        playerStands: {
          include: { stand: true },
        },
      },
    });
  }

  
}