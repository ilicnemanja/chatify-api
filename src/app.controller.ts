import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhooksService } from './auth/webhooks/webhooks.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly webhooksService: WebhooksService) { }

  @Get("health")
  @HttpCode(HttpStatus.OK)
  health(): string {
    return "Healthy!";
  }

  @Get('webhooks')
  async handleWebhook(@Body() payload: any) {
    return this.webhooksService.handleWebhook(payload);
  }
}
