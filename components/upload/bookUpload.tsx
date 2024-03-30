'use client';
import { BookForm } from "@/components/upload/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export const BookUpload = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>

            Upload New Book
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Book</DialogTitle>
          </DialogHeader>
          <BookForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

