import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailTransporterProvider } from './email.provider';
import { EmailLogsModule } from 'src/email-logs/email-logs.module';

@Module({
  imports: [EmailLogsModule],
  providers: [EmailService, MailTransporterProvider],
  controllers: [EmailController],
})
export class EmailModule { }
