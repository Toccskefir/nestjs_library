import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  author!: string;

  @IsNotEmpty()
  @IsNumber()
  publishYear!: number;
}
