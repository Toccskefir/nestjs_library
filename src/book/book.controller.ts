import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller()
export class BookController {
  constructor(private readonly appService: BookService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
