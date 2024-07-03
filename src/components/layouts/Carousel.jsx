import CarouselItem from "./CarouselItem";

export default function Carousel() {
  return (
    <div className="carousel relative w-full md:h-screen mt-20 md:mt-0">
      <CarouselItem
        slide={"slide1"}
        image="/carousel_image1.JPG"
        prevSlide={"slide6"}
        nextSlide={"slide2"}
      />

      <CarouselItem
        slide={"slide2"}
        image="/carousel_image2.JPG"
        prevSlide={"slide1"}
        nextSlide={"slide3"}
      />

      <CarouselItem
        slide={"slide3"}
        image="/carousel_image3.jpg"
        prevSlide={"slide2"}
        nextSlide={"slide4"}
      />

      <CarouselItem
        slide={"slide4"}
        image="/carousel_image4.jpg"
        prevSlide={"slide3"}
        nextSlide={"slide5"}
      />

      <CarouselItem
        slide={"slide5"}
        image="/carousel_image5.jpg"
        prevSlide={"slide4"}
        nextSlide={"slide6"}
      />

      <CarouselItem
        slide={"slide6"}
        image="/carousel_image6.jpg"
        prevSlide={"slide5"}
        nextSlide={"slide1"}
      />
    </div>
  );
}
