import { db } from '../utils/db.server';
import type { Author } from '../author/author.service';

type BookRead = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: Author;
};

type BookWrite = {
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: number;
};

const SELECT_FOR_BOOK_READ = {
  id: true,
  title: true,
  datePublished: true,
  isFiction: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true
    }
  }
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: SELECT_FOR_BOOK_READ
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id
    },
    select: SELECT_FOR_BOOK_READ
  });
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parsedDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      datePublished: parsedDate,
      isFiction
    },
    select: SELECT_FOR_BOOK_READ
  });
};

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  return db.book.update({
    where: {
      id
    },
    data: {
      title,
      authorId,
      datePublished,
      isFiction
    },
    select: SELECT_FOR_BOOK_READ
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id
    }
  });
};