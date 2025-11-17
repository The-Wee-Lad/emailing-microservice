import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetLogsDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number for pagination (must be >= 1)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page (must be >= 1)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
