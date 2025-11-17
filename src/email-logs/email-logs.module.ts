import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLogSchema } from './email.schema';
import { EmailLogsService } from './email-logs.service';
import { EmailLogsController } from './email-logs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'EmailLog',
        schema: EmailLogSchema,
      },
    ]),
  ],
  providers: [EmailLogsService],
  controllers: [EmailLogsController],
  exports: [EmailLogsService],
})
export class EmailLogsModule { }
