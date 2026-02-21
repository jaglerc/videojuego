import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAnswersDto } from './dto/submit-answers.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(dto: SubmitAnswersDto) {
    const player = await this.prisma.player.findUnique({ where: { id: dto.playerId } });
    if (!player) throw new NotFoundException('Jugador no encontrado');

    const stand = await this.prisma.stand.findUnique({
      where: { code: dto.standCode },
      include: {
        questions: { include: { options: true } },
      },
    });
    if (!stand) throw new NotFoundException('Stand no encontrado');

    const alreadyCompleted = await this.prisma.playerStand.findUnique({
      where: { playerId_standId: { playerId: player.id, standId: stand.id } },
    });
    if (alreadyCompleted) throw new BadRequestException('Ya completaste este stand');

    let correctAnswers = 0;

    for (const answer of dto.answers) {
      const option = await this.prisma.option.findUnique({ where: { id: answer.optionId } });
      if (option && option.questionId === answer.questionId && option.isCorrect) {
        correctAnswers++;
      }
    }

    const seedEarned = correctAnswers >= 2;

    await this.prisma.playerStand.create({
      data: {
        playerId: player.id,
        standId: stand.id,
        correctAnswers,
        completed: true,
        seedEarned,
      },
    });

    await this.prisma.player.update({
      where: { id: player.id },
      data: {
        totalPoints: { increment: correctAnswers },
        seeds: seedEarned ? { increment: 1 } : undefined,
      },
    });

    return {
      correctAnswers,
      seedEarned,
      message: seedEarned ? 'Ganaste una semilla' : 'No alcanzaste la semilla, necesitas al menos 2 respuestas correctas',
    };
  }
}