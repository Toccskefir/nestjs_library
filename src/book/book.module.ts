import { Module, ValidationPipe } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class BookModule {}
