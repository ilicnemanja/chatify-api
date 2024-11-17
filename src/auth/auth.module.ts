import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { WebhooksService } from './webhooks/webhooks.service';

@Module({
  controllers: [AuthController],
  providers: [WebhooksService],
  exports: [WebhooksService],
})
export class AuthModule {}
