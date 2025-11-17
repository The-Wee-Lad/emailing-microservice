/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import nodemailer, { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const MailTransporterProvider = {
  provide: 'MAIL_TRANSPORTER',
  inject: [ConfigService],
  useFactory: (config: ConfigService): Transporter => {
    return nodemailer.createTransport({
      host: config.get<string>('SMTP_HOST'),
      port: config.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: config.get<string>('SMTP_USER'),
        pass: config.get<string>('SMTP_PASS'),
      },
    });
  },
};
