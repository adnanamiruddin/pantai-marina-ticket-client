import ticketsApi from "@/api/modules/tickets.api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NotFound from "@/components/layouts/globals/NotFound";
import GlobalLoading from "@/components/layouts/globals/GlobalLoading";
import ShowQrCodeModal from "@/components/layouts/modals/ShowQrCodeModal";

export default function TicketDetail() {
  const router = useRouter();
  const { ticketId } = router.query;

  const [ticket, setTicket] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      const { response, error } = await ticketsApi.getTicketByTicketId({
        ticketId,
      });
      if (response) setTicket(response);
      if (error) toast.error(error);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 3000);
    };

    if (ticketId) fetchTicket();
  }, [ticketId]);

  const handlePayForTicketButtonClicked = () => {
    document.getElementById("show_qr_code_modal").showModal();
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return (
    <>
      {isDataLoaded ? (
        ticket ? (
          <div className="shadow-md border border-orange-300 p-4 rounded md:w-[32%]">
            <h2 className="font-bold text-3xl">Tiket</h2>

            <div className="mt-4 flex justify-between items-center">
              <h6 className="text-sm">
                {format(ticket.visitDate, "eeee, dd-MM-yyyy", { locale: id })}
              </h6>
              {/*  */}
              <div
                className={`text-sm text-white py-0.5 rounded ${
                  ticket.status === "pending"
                    ? "bg-red-500 px-2"
                    : ticket.status === "paid"
                    ? "bg-green-600 px-3"
                    : ticket.status === "confirmed"
                    ? "bg-orange-600 px-3"
                    : "bg-red-700 px-3"
                }`}
              >
                {ticket.status === "pending"
                  ? "Menunggu Pembayaran"
                  : ticket.status === "paid"
                  ? "Sudah Dibayar"
                  : ticket.status === "confirmed"
                  ? "Telah Dikonfirmasi"
                  : "Dibatalkan"}
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <h4>Tiket Dewasa ({ticket.adultCount})</h4>
              <h4>{formatRupiah(ticket.adultCount * 10000)}</h4>
            </div>

            <div className="mt-1 flex justify-between items-center">
              <h4>Tiket Anak-Anak ({ticket.childCount})</h4>
              <h4>{formatRupiah(ticket.childCount * 5000)}</h4>
            </div>

            <div className="divider divider-warning"></div>

            <div className="flex justify-between items-center">
              <h4>Tiket Parkir Mobil ({ticket.carCount})</h4>
              <h4>{formatRupiah(ticket.carCount * 3000)}</h4>
            </div>

            <div className="mt-1 flex justify-between items-center">
              <h4>Tiket Parkir Motor ({ticket.motorcycleCount})</h4>
              <h4>{formatRupiah(ticket.motorcycleCount * 2000)}</h4>
            </div>

            <div className="divider divider-warning"></div>

            <div className="flex justify-between items-center font-bold">
              <h4>Total Pembayaran</h4>
              <h4>{formatRupiah(ticket.transaction.totalPrice)}</h4>
            </div>

            {ticket.status === "pending" ? (
              <button
                className="mt-5 w-full bg-orange-500 border-0 text-white text-lg font-semibold py-3 rounded hover:bg-orange-400"
                onClick={handlePayForTicketButtonClicked}
              >
                Bayar Sekarang
              </button>
            ) : (
              <>
                <div
                  className={`mt-5 w-full border-0 font-medium text-lg py-3 rounded flex justify-center hover:brightness-110 ${
                    ticket.status === "paid"
                      ? "bg-green-600 text-white"
                      : "bg-orange-600 text-white"
                  }`}
                >
                  {ticket.bookingCode}
                </div>
                <p className="text-end text-xs mt-2 text-orange-600 font-semibold">
                  *kode di atas merupakan kode booking tiket
                </p>
              </>
            )}

            <ShowQrCodeModal ticket={ticket} />
          </div>
        ) : (
          <NotFound />
        )
      ) : (
        <GlobalLoading />
      )}
    </>
  );
}
