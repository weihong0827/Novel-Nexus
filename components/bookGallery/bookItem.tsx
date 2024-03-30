'use client'
import Link from 'next/link';
import { ExchangeRequestDialog } from '@/components/exchangeRequest/exchangeRequest';
import { Book } from "prisma/prisma-client"
import { Separator } from '@/components/ui/separator';
import { ImageCarousel } from './imageCarousel';

export interface BookItemProps {
  book: Book
}

export const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 items-start gap-4">
        <div className="flex gap-4 justify-center" >

          {book.image.length > 0 ? <ImageCarousel images={book.image} />
            : <div className="w-full max-w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-md"></div>}
        </div>
        <div className="grid gap-4">

          <div className="grid gap-1.5">
            <h2 className="text-lg font-semibold truncate">{book.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Authored by: {book.author}</p>
          </div>
          <h3 className="text-xl font-semibold">Description</h3>
          <p className='line-clamp-4'>
            {book.description}
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </p>
          <h3 className="text-xl font-semibold">Condition</h3>
          <p>{book.condition}</p>
          <h3 className="text-xl font-semibold">Seed Required</h3>
          <p>{book.seedAmount}</p>
          <ExchangeRequestDialog book={book} />
        </div>
      </div>
      <Separator />
    </>
  )
}
