'use client'
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Book } from 'prisma/prisma-client'
import { DialogClose } from "@radix-ui/react-dialog"
import { useRef } from "react"
import { exchange } from "@/lib/exchange"
import { useToast } from "@/components/ui/use-toast"
export interface ExchangeRequestFormProps {
  book: Book
}
export const ExchangeRequestDialog: React.FC<ExchangeRequestFormProps> = ({ book }) => {
  const { toast } = useToast()

  const messageRef = useRef<HTMLTextAreaElement>(null)
  const onSubmit = async () => {
    try {
      await exchange(book, messageRef.current?.value || '')
      toast({
        title: 'Success',
        description: "Request sent successfully",
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: "Unable to request this book",
        variant: 'destructive',
      })

    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >Request</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request this book</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Title</p>
            <p>{book.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Author</p>
            <p>{book.author}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Genre</p>
            <p>{book.genre}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Condition</p>
            <p>{book.condition}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Seed Cost</p>
            <p>{book.seedAmount}</p>
          </div>

        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea ref={messageRef} className="min-h-[100px]" id="message" placeholder="Enter your message for the owner" />
        </div>
        <DialogFooter>
          <DialogClose asChild>

            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onSubmit}>Request</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

