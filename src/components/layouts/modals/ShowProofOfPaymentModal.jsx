import ticketsApi from "@/api/modules/tickets.api";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShowProofOfPaymentModal({
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

  const handleConfirmTicket = async () => {
    if (loading || !ticket) return;

    setLoading(true);
    const { response, error } = await ticketsApi.confirmTicket({
      ticketId: ticket.id,
    });
    if (response) {
      toast.success(
        "Tiket berhasil dikonfirmasi. Halaman akan dimuat ulang..."
      );
      document.getElementById("show_proof_of_payment_modal").close();
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
    <dialog id="show_proof_of_payment_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Bukti Pembayaran</h3>

        {isDataLoaded ? (
          <>
            {ticket.transaction.proofOfPaymentURL ? (
              <Image
                src={ticket.transaction.proofOfPaymentURL}
                alt="Proof Of Payment Image"
                width={500}
                height={500}
                className="mt-5 mx-auto max-h-96 object-cover"
              />
            ) : null}

            {ticket.status === "paid" ? (
              <button
                type="button"
                onClick={handleConfirmTicket}
                className={`mt-6 btn bg-green-600 w-full border-0 text-white text-lg hover:bg-green-500 ${
                  loading ? "brightness-75" : ""
                }`}
              >
                {loading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Konfirmasi Tiket"
                )}
              </button>
            ) : null}
          </>
        ) : (
          <div className="mt-8 flex justify-center items-center h-96">
            <div className="loading loading-bars loading-lg"></div>
          </div>
        )}
      </div>
    </dialog>
  );
}
