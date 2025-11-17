import { Optional } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';

export class sendMailDto {
  @IsEmail()
  to: string;

  @IsEmail()
  from: string;

  @Optional()
  @IsString()
  subject: string = '';

  @IsString()
  content: string;
}
