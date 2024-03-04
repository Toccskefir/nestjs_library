import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
}
