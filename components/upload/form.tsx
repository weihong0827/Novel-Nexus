"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DataItem, AutoComplete } from "@/components/ui/autocomplete"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  author: z.string().min(3),
  genre: z.string().min(3),
  projectImage: z.array(z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
  )

});
const genreOptions: DataItem[] = [
  { id: "fantasy", label: "Fantasy" },
  { id: "horror", label: "Horror" },
  { id: "romance", label: "Romance" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "thriller", label: "Thriller" },
  { id: "mystery", label: "Mystery" },
  { id: "nonfiction", label: "Non-Fiction" },
  { id: "biography", label: "Biography" },
  { id: "history", label: "History" },
  { id: "selfhelp", label: "Self-Help" },
  { id: "cookbook", label: "Cookbook" },
  { id: "poetry", label: "Poetry" },
  { id: "graphicnovel", label: "Graphic Novel" },
  { id: "children", label: "Children" },
  { id: "youngadult", label: "Young Adult" },
  { id: "other", label: "Other" },
]

type TFormValues = z.infer<typeof formSchema>;

export function BookForm() {

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  function onSubmit(values: TFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
