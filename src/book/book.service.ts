import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';
import { BookDTO } from './book.dto';

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

  public getAllBooks(): Book[] {
    return this.books;
  }

  public getBook(id: string): Book | undefined {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException();
    } else {
      return book;
    }
  }

  public addNewBook(bookDto: BookDTO) {
    const id: number = Number(this.books.slice(-1)[0].id);
    const newBook: Book = {
      id: (id + 1).toString(),
      ...bookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  public deleteBook(id: string) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.books.splice(index, 1);
  }

  public updateBook(id: string, bookDto: BookDTO) {
    const book = this.getBook(id);
    if (!book) {
      throw new NotFoundException();
    }
    Object.assign(book, bookDto);
    return book;
  }
}
