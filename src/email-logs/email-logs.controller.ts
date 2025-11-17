import { Controller, Get, Query } from '@nestjs/common';
import { EmailLogsService } from './email-logs.service';
import { GetLogsDto } from './dto/getLogs.dto';
import { ApiResponse } from 'src/common/ApiResponse';

@Controller('email-logs')
export class EmailLogsController {
  constructor(private readonly emailLogsService: EmailLogsService) { }

  @Get()
  async getAllLogs(@Query() query: GetLogsDto) {
    const logs = await this.emailLogsService.getAll(query);
    return ApiResponse.success('Fetched All the Logs', logs);
  }
}
