import ticketsApi from "@/api/modules/tickets.api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NotFound from "@/components/layouts/NotFound";
import GlobalLoading from "@/components/layouts/GlobalLoading";

export default function TicketDetail() {
  const router = useRouter();
  const { ticketId } = router.query;

  const [ticket, setTicket] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_PAYMENT_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [ticketId]);

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

  const handlePayForTicket = async () => {
    if (loading) return;

    setLoading(true);
    const ticketName = `Tiket Wisata Pantai Marina ${format(
      ticket.visitDate,
      "dd-MM-yyyy"
    )}`;

    const { response, error } = await ticketsApi.payForTicketByTicketId({
      ticketId: ticket.id + "-" + ~~(Math.random() * 100) + 1,
      ticketName,
      price: ticket.transaction.totalPrice,
      quantity: ticket.adultCount + ticket.childCount,
    });

    if (response) window.snap.pay(response);
    if (error) toast.error(error);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return isDataLoaded ? (
    ticket ? (
      <div className="shadow-md border border-gray-200 p-4 rounded md:w-[32%]">
        <h2 className="font-bold text-3xl">Tiket</h2>

        <div className="mt-4 flex justify-between">
          <div>
            <h6 className="text-sm">
              {format(ticket.visitDate, "eeee, dd-MM-yyyy", { locale: id })}
            </h6>
          </div>

          <div
            className={`text-sm text-white py-0.5 rounded font-medium ${
              ticket.status === "pending"
                ? "bg-red-500 px-2"
                : "bg-green-500 px-3"
            }`}
          >
            {ticket.status === "pending" ? "Menunggu Pembayaran" : "Selesai"}
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

        <div className="mt-3 flex justify-between items-center font-bold">
          <h4>Total Pembayaran</h4>
          <h4>{formatRupiah(ticket.transaction.totalPrice)}</h4>
        </div>

        {ticket.status === "pending" ? (
          <button
            className={`mt-5 w-full bg-orange-500 border-0 text-white text-lg py-3 rounded hover:brightness-110 ${
              loading ? "cursor-not-allowed brightness-75" : ""
            }`}
            onClick={handlePayForTicket}
          >
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Bayar Sekarang"
            )}
          </button>
        ) : (
          <div className="mt-5 w-full bg-green-500 border-0 text-white font-medium text-lg py-3 rounded hover:brightness-110 flex justify-center">
            Sudah Dibayar
          </div>
        )}
      </div>
    ) : (
      <NotFound />
    )
  ) : (
    <GlobalLoading />
  );
}
