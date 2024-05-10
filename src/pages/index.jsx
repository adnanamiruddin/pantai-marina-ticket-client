import Link from "next/link";
import Calendar from "../components/layouts/Calender";

export default function Home() {
  return (
    <div>
      <h3 className="font-semibold text-xl">Booking Online Pantai Marina</h3>

      <p className="mt-3 text-justify">
        Pantai Marina adalah sebuah pantai di Kabupaten Bantaeng. Awalnya pantai
        ini adalah daerah kumuh, namun diperbaiki hingga menjadi kawasan wisata
        dan olahraga air. Di Pantai Marina terdapat fasilitas pelatihan kerja
        yang mampu menampung hingga 2000 orang peserta pelatihan.
      </p>

      <p className="mt-6 text-justify font-medium">
        Buka Setiap hari pukul 08:00-16:00 WIB & Tutup pada Hari Besar Keagamaan
        sesuai SKB Tiga Menteri tentang Hari Libur Nasional dan Cuti Bersama
      </p>

      <Link
        href="#calendar"
        className="mt-6 btn bg-orange-500 w-full border-0 text-white text-lg hover:bg-orange-700"
      >
        Pesan Tiket Sekarang
      </Link>

      <Calendar />
    </div>
  );
}
