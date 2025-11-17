import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { sendMailDto } from './dto/sendMail.dto';
import { Transporter, SentMessageInfo } from 'nodemailer';
import { EmailLogsService } from 'src/email-logs/email-logs.service';
import { CustomApiResponse } from 'src/common/ApiResponse';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly config: ConfigService,
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: Transporter<SentMessageInfo>,
    private readonly emailLogsService: EmailLogsService,
  ) { }

  async sendEmail(email: sendMailDto): Promise<SentMessageInfo> {
    const from = this.config.get<string>('FROM');
    try {
      const result = await this.transporter.sendMail({
        to: email.to,
        from,
        subject: email.subject,
        html: email.content,
      });

      const newEmail = await this.emailLogsService.createEmailLog({
        to: email.to,
        from: from,
        subject: email.subject,
        content: email.content,
        status: 'SENT',
        messageId: result.messageId,
      });

      return CustomApiResponse.success('Email Sent', newEmail);
    } catch (error) {
      await this.emailLogsService.createEmailLog({
        to: email.to,
        from: from,
        subject: email.subject,
        content: email.content,
        status: 'FAILED',
        messageId: null,
        errorMessage: error.message,
      });

      throw new InternalServerErrorException(
        `Failed to send email: ${error.message}`,
      );
    }
  }
}
