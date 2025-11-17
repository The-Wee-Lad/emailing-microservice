import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class sendMailDto {
  @ApiProperty({
    example: 'a6925220@gmail.com',
    description: 'Recipient email address',
  })
  @IsEmail()
  to: string;

  // @ApiProperty({
  //   example: '',
  //   description: 'Sender email address',
  // })
  // @IsEmail()
  // from: string;

  @ApiPropertyOptional({
    example: 'Welcome to our service!',
    description: 'Email subject',
  })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({
    example: 'This is a test mail.',
    description: 'Email content body',
  })
  @IsString()
  content: string;
}
