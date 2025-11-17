import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomApiResponse } from './common/ApiResponse';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('pulse')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Returns service health status',
  })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealthCheck() {
    const healthCheck = this.appService.healthCheck();
    return CustomApiResponse.success('Service Is Healthy', healthCheck);
  }
}
