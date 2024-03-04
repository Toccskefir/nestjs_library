import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Post('/add')
  addNewBook(@Body() bookDto: BookDTO) {
    return this.bookService.addNewBook(bookDto);
  }

  @Delete('/delete/:id')
  deleteBook(@Param('id') id: string) {
    this.bookService.deleteBook(id);
  }

  @Put('/update/:id')
  updateBook(@Param('id') id: string, @Body() bookDto: BookDTO) {
    return this.bookService.updateBook(id, bookDto);
  }
}
