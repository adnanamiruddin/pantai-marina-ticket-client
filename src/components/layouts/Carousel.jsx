import CarouselItem from "./CarouselItem";

export default function Carousel() {
  return (
    <div className="carousel relative w-full md:h-screen mt-20 md:mt-0">
      <CarouselItem
        slide={"slide1"}
        image="/carousel_image1.png"
        prevSlide={"slide4"}
        nextSlide={"slide2"}
      />

      <CarouselItem
        slide={"slide2"}
        image="/carousel_image2.png"
        prevSlide={"slide1"}
        nextSlide={"slide3"}
      />

      <CarouselItem
        slide={"slide3"}
        image="/carousel_image3.png"
        prevSlide={"slide2"}
        nextSlide={"slide4"}
      />

      <CarouselItem
        slide={"slide4"}
        image="/carousel_image4.png"
        prevSlide={"slide3"}
        nextSlide={"slide5"}
      />

      <CarouselItem
        slide={"slide5"}
        image="/carousel_image5.png"
        prevSlide={"slide4"}
        nextSlide={"slide1"}
      />
    </div>
  );
}
