import Image from "next/image";
import { BookUpload } from "@/components/upload/bookUpload";

const fetchData = async () => {



}

export default async function Home() {
  // const data = await fetchData()
  // console.log(data)
  return (
    <BookUpload />

  );
}
