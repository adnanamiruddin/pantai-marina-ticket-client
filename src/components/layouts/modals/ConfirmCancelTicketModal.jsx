import ticketsApi from "@/api/modules/tickets.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ConfirmCancelTicketModal({
  ticketId,
  setSelectedTicketId,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const { response, error } = await ticketsApi.getTicketByTicketId({
        ticketId,
      });
      if (response) {
        setTicket(response);
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 1000);
      }
      if (error) toast.error(error.message);
    };
    //
    if (ticketId) fetchTicket();
  }, [ticketId]);

  const handleCancelTicket = async () => {
    if (loading) return;

    setLoading(true);
    const { response, error } = await ticketsApi.cancelTicket({
      ticketId: ticket.id,
    });
    if (response) {
      toast.success("Tiket berhasil dibatalkan. Halaman akan dimuat ulang...");
      document.getElementById("confirm_cancel_ticket_modal").close();
      setTimeout(() => {
        router.reload();
        setLoading(false);
      }, 3000);
    }
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedTicketId(null);
    setTimeout(() => {
      setIsDataLoaded(false);
    }, 500);
  };

  return (
    <dialog id="confirm_cancel_ticket_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Konfirmasi Pembatalan Tiket</h3>

        {isDataLoaded ? (
          <>
            <IoWarningOutline className="mt-6 text-center w-full text-6xl" />

            <h4 className="mt-4 text-center text-lg">
              Apakah tiket dengan kode booking{" "}
              <span className="font-semibold">{ticket.bookingCode}</span>{" "}
              benar-benar ingin dibatalkan?
            </h4>

            <div className="mt-4 flex justify-center items-center gap-5">
              <button
                onClick={handleCancelTicket}
                disabled={loading}
                className={`w-1/3 py-2.5 text-white font-medium text-center bg-red-600 hover:bg-red-500 rounded-lg border border-red-700 hover:border-red-600 ${
                  loading ? "brightness-75" : ""
                }`}
              >
                {!loading ? (
                  "Ya, batalkan"
                ) : (
                  <span className="loading loading-bars loading-md"></span>
                )}
              </button>

              <form method="dialog" className="w-1/3">
                <button className="w-full py-2.5 text-gray-900 font-medium text-center bg-gray-100 hover:bg-gray-50 rounded-lg border border-gray-300 hover:border-gray-200">
                  {!loading ? (
                    "Tidak"
                  ) : (
                    <span className="loading loading-bars loading-md"></span>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="mt-8 flex justify-center items-center h-48">
            <div className="loading loading-bars loading-lg"></div>
          </div>
        )}
      </div>
    </dialog>
  );
}
