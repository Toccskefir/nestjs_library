import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

describe('BookController', () => {
  let controller: BookController;
  let mockBookService: BookService;

  beforeEach(async () => {
    mockBookService = {} as BookService;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should return the list of books returned by bookService.getAllBooks() method', () => {
    mockBookService.getAllBooks = () => {
      return [{ id: '42', title: 'test', author: 'author', publishYear: 1111 }];
    }; //arrange
    const books = controller.getAllBooks(); //act
    expect(books).toEqual([
      { id: '42', title: 'test', author: 'author', publishYear: 1111 },
    ]); //assert
  });

  it('should return a single book returned by bookService.getBook() method', () => {
    mockBookService.getBook = (id: string) => {
      if (id === '42') {
        return { id: '42', title: 'test', author: 'author', publishYear: 1111 };
      }
    }; //arrange
    const book = controller.getBook('42'); //act
    expect(book).toEqual({
      id: '42',
      title: 'test',
      author: 'author',
      publishYear: 1111,
    });
  });

  it('should return a single book returned by bookService.addNewBook() method', () => {
    mockBookService.addNewBook = (input: BookDTO) => ({ id: '42', ...input }); //arrange
    const book = controller.addNewBook({
      title: 'test',
      author: 'author',
      publishYear: 1111,
    }); //act
    expect(book).toEqual({
      id: '42',
      title: 'test',
      author: 'author',
      publishYear: 1111,
    }); //assert
  });

  it('should return the updated book returned by bookService.updateBook() method', () => {
    mockBookService.updateBook = (id: string, input: BookDTO) => {
      return { id, ...input };
    }; //arrange
    const book = controller.updateBook('42', {
      title: 'title after update',
      author: 'author after update',
      publishYear: 2222,
    }); //act
    expect(book).toEqual({
      id: '42',
      title: 'title after update',
      author: 'author after update',
      publishYear: 2222,
    }); //assert
  });

  it('should call bookService.deleteBook()', () => {
    mockBookService.deleteBook = jest.fn(); //arrange
    controller.deleteBook('42'); //act
    expect(mockBookService.deleteBook).toHaveBeenCalledWith('42'); //assert
  });
});
