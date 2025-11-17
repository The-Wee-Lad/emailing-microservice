import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailLog } from './email.schema';

@Injectable()
export class EmailLogsService {
  constructor(
    @InjectModel('EmailLog')
    private readonly emailLogModel: Model<EmailLog>,
  ) { }

  async getAll({ page = 1, limit = 10 }): Promise<EmailLog[]> {
    const allEmailLogs = await this.emailLogModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    return allEmailLogs;
  }

  async createEmailLog(email: Partial<EmailLog>): Promise<EmailLog> {
    const newEmail = this.emailLogModel.create({
      to: email.to,
      from: email.from,
      content: email.content,
      subject: email.subject,
      status: email.status || 'SENDING',
      messageId: email.messageId,
    });
    return newEmail;
  }
}
