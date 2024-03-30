

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { listBooks } from "./action"
import { BookItem } from "./bookItem"
import { Search } from "./search"



export async function BookGallery() {
  const books = await listBooks()
  return (
    <div className="px-4 py-6 space-y-6 md:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Book Exchange</h1>
        <p className="text-gray-500 dark:text-gray-400">Search for books by title, author, or genre</p>
      </div>
      <div className="space-y-4">
        <Search/>
        <Separator />
      </div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}

    </div>
  )
}
