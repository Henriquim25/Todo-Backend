import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isDone: boolean = false;
}
