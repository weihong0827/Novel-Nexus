
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
export const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  author: z.string().min(3),
  genre: z.string().min(3),
  bookImages: z.array(z.instanceof(File))
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  seed: z.number().min(1).max(100),
  condition: z.string().min(3),

});
export type TFormValues = z.infer<typeof formSchema>;
export type BookCreate = Omit<TFormValues, 'bookImages'> & {
  bookImages: string[];
};
