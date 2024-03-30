
'use client'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { type Book } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { searchBook } from './action'



export function Search() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<
    Array<Book & { similarity?: number }>
  >([])
  const [debouncedQuery] = useDebounce(query, 150)
  useEffect(() => {
    let current = true
    if (debouncedQuery.trim().length > 0) {
      searchBook(debouncedQuery).then((results:Array<Book&{similarity?:number}>) => {
        if (current) {
          setSearchResults(results)
        }
      })
    }
    return () => {
      current = false
    }
  }, [debouncedQuery])
  return (
    <div className="w-full">
      <Command label="Command Menu" shouldFilter={false} className="h-[200px]">
        <CommandInput
          id="search"
          placeholder="Search for Book"
          className="focus:ring-0 sm:text-sm text-base focus:border-0 border-0 active:ring-0 active:border-0 ring-0 outline-0"
          value={query}
          onValueChange={(q) => setQuery(q)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.map((book) => (
            <CommandItem
              key={book.id}
              value={book.title}
              className="data-[selected='true']:bg-zinc-50  flex items-center justify-between py-3"
              onSelect={(p) => {
                console.log(p)
                // toast.success(`You selected ${p}!`)
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {book.title.substring(0, 90)}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {book.similarity ? (
                  <div className="text-xs font-mono p-0.5 rounded bg-zinc-100">
                    {book.similarity.toFixed(3)}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  )
}

Search.displayName = 'Search'
