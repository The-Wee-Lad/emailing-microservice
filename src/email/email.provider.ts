/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as nodemailer from 'nodemailer';
import { Transporter, SentMessageInfo } from 'nodemailer';

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const MailTransporterProvider = {
  provide: 'MAIL_TRANSPORTER',
  inject: [ConfigService],
  useFactory: async (
    config: ConfigService,
  ): Promise<nodemailer.Transporter<SentMessageInfo>> => {
    const logger = new Logger('Transporter');
    const transporter = nodemailer.createTransport({
      host: config.get<string>('SMTP_HOST'),
      port: config.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: config.get<string>('SMTP_USER'),
        pass: config.get<string>('SMTP_PASS'),
      },
    });
    const result = await transporter.verify();
    logger.log(`Connected To SMTP server :: ${result}`);
    return transporter;
  },
};
