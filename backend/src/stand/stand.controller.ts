import { Controller, Get, Param } from '@nestjs/common';
import { StandService } from './stand.service';

@Controller('stand')
export class StandController {
  constructor(private readonly standService: StandService) {}

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.standService.findByCode(code);
  }
}