import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { sendMailDto } from './dto/sendMail.dto';
import { Transporter, SentMessageInfo } from 'nodemailer';
import { EmailLogsService } from 'src/email-logs/email-logs.service';
import { ApiResponse } from 'src/common/ApiResponse';

@Injectable()
export class EmailService {
  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: Transporter<SentMessageInfo>,
    private readonly emailLogsService: EmailLogsService,
  ) { }

  async sendEmail(email: sendMailDto): Promise<SentMessageInfo> {
    try {
      const result = await this.transporter.sendMail({
        to: email.to,
        from: email.from,
        subject: email.subject,
        html: email.content,
      });

      const newEmail = await this.emailLogsService.createEmailLog({
        to: email.to,
        from: email.from,
        subject: email.subject,
        content: email.content,
        status: 'SENT',
        messageId: result.messageId,
      });

      return ApiResponse.success('Email Sent', newEmail);
    } catch (error) {
      await this.emailLogsService.createEmailLog({
        to: email.to,
        from: email.from,
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
