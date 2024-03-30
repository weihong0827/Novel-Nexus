"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BookCreate, TFormValues, formSchema } from "@/types/book";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PutBlobResult } from '@vercel/blob';
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBook } from "@/lib/book";




export function BookForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
      genre: "",
      condition: "",
      seed: 0,
      description: "",
      bookImages: [],

    },
  });
  const { toast } = useToast();

  async function onSubmit(values: TFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    const urls = []
    for (const image of values.bookImages) {

      const response = await fetch(`/api/upload?filename=${image.name}`, {
        method: 'POST',
        body: image,
      });
      const result = await response.json() as PutBlobResult
      urls.push(result.url)

    }

    const bookValuesWithUrls: BookCreate = {
      ...values,
      bookImages: urls, // Replace the File array with the URLs array
    };
    try {
      const result = await createBook(bookValuesWithUrls);
      setLoading(false);
      form.reset();
      toast({ description: "Book created successfully" })

    } catch (error) {
      setLoading(false);
      toast({ description: "Failed to create book" })
    }

  }

  return (
    <div className="container mx-auto flex max-h-[1000px] items-center justify-center">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Uploading...</p>
          </div>
        </div>)
      }

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Book name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Author" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">Genre</FormLabel>
                <FormControl>
                  {/* TODO: Implement AutoComplete */}
                  <Input {...field} placeholder="Genre (comma seperated) eg. horror,fiction" />


                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">Condition</FormLabel>
                <FormControl>
                  {/* TODO: Implement AutoComplete */}
                  <Input {...field} placeholder="condition" />

                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">Seed</FormLabel>
                <FormControl>
                  <Input {...field} type={"number"} onChange={(e) => field.onChange(e.target.valueAsNumber)} placeholder="How much you want to rent for" />

                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="description" />

                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookImages"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...rest}
                      multiple={true}
                      onChange={(event) => {
                        const files = event.target.files;
                        onChange([...Array.from(files ?? [])]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div >
  );
}
