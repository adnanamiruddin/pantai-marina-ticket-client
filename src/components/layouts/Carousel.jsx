import Image from "next/image";

export default function Carousel() {
  return (
    <div>
      <Image
        src="/pantai-marina.jpg"
        alt="Carousel 1"
        width={100}
        height={100}
        className="w-full brightness-75 md:h-screen object-cover"
      />
    </div>
  );
}
