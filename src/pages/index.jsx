import Link from "next/link";
import Calendar from "../components/layouts/Calender";
import { useEffect, useState } from "react";
import ticketsApi from "@/api/modules/tickets.api";
import { addMinutes, isBefore } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import dynamic from "next/dynamic";

const HomeMapLocation = dynamic(
  () => import("@/components/layouts/HomeMapLocation"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const { response } = await ticketsApi.getAllTickets();
      if (response) setTickets(response);
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const checkAndCancelTickets = async () => {
      const timeZone = "Asia/Makassar";
      const now = new Date();

      const cancelPromises = tickets.map(async (ticket) => {
        const zonedDate = toZonedTime(now, timeZone);
        const ticketExpirationTime = addMinutes(new Date(ticket.createdAt), 10);
        const zonedTicketExpirationTime = toZonedTime(
          ticketExpirationTime,
          timeZone
        );

        if (
          isBefore(zonedTicketExpirationTime, zonedDate) &&
          ticket.status === "pending"
        ) {
          await ticketsApi.deleteTicket({
            ticketId: ticket.id,
          });
        }
      });
      await Promise.all(cancelPromises);
    };

    // if (tickets.length > 0) checkAndCancelTickets();
  }, [tickets]);

  return (
    <div className="md:px-24">
      <h3 className="font-semibold text-xl">Booking Online Pantai Marina</h3>

      <p className="mt-3 text-justify">
        Pantai Marina merupakan sebuah daya tarik wisata yang terkenal karena
        keindahan alamnya yang memukau. Pantai Marina dikelilingi oleh pasir
        halus, air laut yang transparan, serta pemandangan pegunungan yang
        menawan. Keindahan alam yang luar biasa ini menciptakan suasana damai
        dan menenangkan bagi para pengunjungnya.
      </p>

      <p className="mt-6 text-justify font-medium">
        Buka Setiap hari pukul 08:00-16:00 WIB & Tutup pada Hari Besar Keagamaan
        sesuai SKB Tiga Menteri tentang Hari Libur Nasional dan Cuti Bersama
      </p>

      <div className="mt-6">
        <HomeMapLocation />
        {/*  */}
        <p className="mt-1 text-xs">*Klik untuk membuka Google Mapas</p>
      </div>

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
