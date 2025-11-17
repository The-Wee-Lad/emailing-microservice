import { Controller, Get, Query } from '@nestjs/common';
import { EmailLogsService } from './email-logs.service';
import { GetLogsDto } from './dto/getLogs.dto';
import { CustomApiResponse } from 'src/common/ApiResponse';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Email Logs')
@Controller('email-logs')
export class EmailLogsController {
  constructor(private readonly emailLogsService: EmailLogsService) { }

  @Get()
  @ApiOperation({
    summary: 'Get all email logs',
    description: 'Returns paginated list of all sent email logs',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination (>= 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page (>= 1)',
  })
  @ApiResponse({ status: 200, description: 'Fetched all logs successfully' })
  async getAllLogs(@Query() query: GetLogsDto) {
    const logs = await this.emailLogsService.getAll(query);
    return CustomApiResponse.success('Fetched All the Logs', logs);
  }
}
