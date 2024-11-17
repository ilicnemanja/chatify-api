import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  @Get("health")
  @HttpCode(HttpStatus.OK)
  health(): string {
    return "Healthy!";
  }
}
