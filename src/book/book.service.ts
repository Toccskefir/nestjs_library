import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BookService {
  private readonly books: Book[] = [
    {
      id: '1',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      publishYear: 1997,
    },
    {
      id: '2',
      title: 'Egri csillaagok',
      author: 'Gárdonyi Géza',
      publishYear: 1901,
    },
    {
      id: '3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishYear: 1925,
    },
  ];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBook(id: string) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException();
    } else {
      return book;
    }
  }
}
