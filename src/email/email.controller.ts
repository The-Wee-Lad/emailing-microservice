import { Body, Controller, Post } from '@nestjs/common';
import { sendMailDto } from './dto/sendMail.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) { }

  @Post()
  sendEmail(@Body() email: sendMailDto) {
    const result = this.emailService.sendEmail(email);
    return result;
  }
}
