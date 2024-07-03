import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex justify-between items-center bg-gray-900 py-6 px-7">
      <div className="flex gap-5 items-center md:gap-7">
        <Image
          src="/logo.png"
          alt="Logo Pantai Marina"
          width={500}
          height={500}
          className="w-10 h-10"
        />

        <p className="text-gray-500 text-sm">
          Copyright © 2024 Pantai Marina. Developed by Sisfo Creative.
        </p>
      </div>
    </div>
  );
}
