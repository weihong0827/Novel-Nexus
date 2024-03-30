
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { getBook } from "@/lib/book"
import type { Metadata, ResolvingMetadata } from 'next'
import { ImageCarousel } from "@/components/bookGallery/imageCarousel"

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const bookId = parseInt(params.id)
  const book = await getBook(bookId)
  if (!book) {
    return {
      title: 'Book not found',
      description: 'The book you are looking for could not be found',
    }
  }

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description || '',
      images: book.image
    },
  }
}
export default async function BookDetail({ params }: Props) {

  const bookId = parseInt(params.id)
  const book = await getBook(bookId)

  return (
    book ?
      <Card className="border-0 max-w-[1000px]">
        < CardHeader className="border-gray-200 dark:border-gray-800" >
          <div className="grid gap-1.5">
            <CardTitle className="text-xl md:text-2xl">{book.title}</CardTitle>
            <CardDescription >
              {book.description}
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
            </CardDescription>
          </div>
        </CardHeader >
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <ImageCarousel images={book.image} />
            <div className="grid gap-4 grid-cols-3 mt-8 text-sm leading-loose">
              <div className="grid gap-1.5">
                <h3 className="text-xl font-semibold">Author</h3>
                <p>{book.author}</p>
              </div>
              <div className="grid gap-1.5">
                <h3 className="text-xl font-semibold">Genre</h3>
                <p>{book.genre}</p>
              </div>
              <div className="grid gap-1.5">
                <h3 className="text-xl font-semibold">Condition</h3>
                <p>{book.condition}</p>
              </div>
              <div className="grid gap-1.5 col-start-2">
                <h3 className="text-xl font-semibold">Seed Required</h3>
                <p>{book.seedAmount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card > : <div>Book not found</div>
  )
}
