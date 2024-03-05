import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  //CREATE TEST
  describe('create', () => {
    it('should return a single book after create', () => {
      const book = service.addNewBook({
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //act
      expect(service.getBook(book.id)).toEqual({
        id: expect.any(String),
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //assert
    });
  });

  //READ TEST
  describe('read', () => {
    it('should return the initial data by default', () => {
      const books = service.getAllBooks(); //act
      expect(books).toEqual([
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
      ]); //assert
    });

    it('should return a single book after create', () => {
      const createdBook = service.addNewBook({
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //arrange
      const book = service.getBook(createdBook.id); //act
      expect(book).toEqual({
        id: expect.any(String),
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //assert
    });

    it('should return undefined if id is unknown', () => {
      expect(() => {
        service.getBook('42');
      }).toThrow(NotFoundException); //assert
    });
  });

  //UPDATE TEST
  describe('update', () => {
    it('should return the updated book with getBook method after update', () => {
      const book = service.addNewBook({
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //arrange
      service.updateBook(book.id, {
        title: 'after update',
        author: 'after update',
        publishYear: 2222,
      }); //act
      expect(service.getBook(book.id)).toEqual({
        id: book.id,
        title: 'after update',
        author: 'after update',
        publishYear: 2222,
      }); //assert
    });

    it('should return the updated book after update', () => {
      const book = service.addNewBook({
        title: 'test',
        author: 'author',
        publishYear: 1111,
      }); //arrange
      const updatedBook = service.updateBook(book.id, {
        title: 'after update',
        author: 'after update',
        publishYear: 2222,
      }); //act
      expect(updatedBook).toEqual({
        id: book.id,
        title: 'after update',
        author: 'after update',
        publishYear: 2222,
      }); //assert
    });

    it('should return a NotFoundException after update', () => {
      expect(() => {
        service.updateBook('42', {
          title: 'after update',
          author: 'after update',
          publishYear: 2222,
        });
      }).toThrow(NotFoundException);
    });
  });

  //DELETE TEST
  describe('delete', () => {
    it('should delete an existing book', () => {
      service.addNewBook({
        title: 'a',
        author: 'a',
        publishYear: 1111,
      });
      const bookToDelete = service.addNewBook({
        title: 'b',
        author: 'b',
        publishYear: 2222,
      });
      service.addNewBook({
        title: 'c',
        author: 'c',
        publishYear: 3333,
      }); //arrange

      service.deleteBook(bookToDelete.id); //act

      expect(service.getAllBooks()).not.toContain({
        id: expect.any(String),
        title: 'b',
        author: 'b',
        publishYear: 2222,
      }); //assert
    });

    it('should return a NotFoundException after delete', () => {
      expect(() => {
        service.deleteBook('42');
      }).toThrow(NotFoundException); //assert
    });
  });
});
