import Image from "next/image";
import { BookUpload } from "@/components/upload/bookUpload";
import { BookGallery } from "@/components/bookGallery/gallery"

export default async function Home() {
  // const data = await fetchData()
  // console.log(data)
  return (
    <>
      <BookUpload />
      <BookGallery />
    </>

  );
}
