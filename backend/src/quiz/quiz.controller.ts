import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitAnswersDto } from './dto/submit-answers.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit')
  submit(@Body() dto: SubmitAnswersDto) {
    return this.quizService.submit(dto);
  }
}