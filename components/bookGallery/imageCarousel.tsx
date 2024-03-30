import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
export interface ImageCarouselProps {
  images: string[]
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  console.log(images)
  return (
    <Carousel>
      <CarouselContent className="w-full max-w-96 h-96 overflow-hidden">
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full h-full">
            <div className="relative h-96 w-96">
              <Image src={image} layout="fill" alt={`Image ${index}`} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
