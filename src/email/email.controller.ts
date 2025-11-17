import { Body, Controller, Post } from '@nestjs/common';
import { sendMailDto } from './dto/sendMail.dto';
import { EmailService } from './email.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) { }

  @Post()
  @ApiOperation({
    summary: 'Send an email',
    description:
      'Triggers the Email Service to send an email using the provided details',
  })
  @ApiBody({ type: sendMailDto })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  sendEmail(@Body() email: sendMailDto) {
    const result = this.emailService.sendEmail(email);
    return result;
  }
}
