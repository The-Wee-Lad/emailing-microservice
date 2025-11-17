import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailTransporterProvider } from './email.provider';

@Module({
  providers: [EmailService, MailTransporterProvider],
  controllers: [EmailController],
})
export class EmailModule { }
