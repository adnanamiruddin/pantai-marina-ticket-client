import ticketsApi from "@/api/modules/tickets.api";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ShowProofOfPaymentModal({ ticket }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  return (
    <dialog id="show_proof_of_payment_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Bukti Pembayaran</h3>

        <Image
          src={ticket.transaction.proofOfPaymentURL}
          alt="Proof Of Payment Image"
          width={500}
          height={500}
          className="mt-5 mx-auto max-h-96 object-cover"
        />

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
      </div>
    </dialog>
  );
}
