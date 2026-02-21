import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlayerModule } from './player/player.module';
import { StandModule } from './stand/stand.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [PrismaModule, PlayerModule, StandModule, QuizModule],
})
export class AppModule {}