import ticketsApi from "@/api/modules/tickets.api";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ConfirmDeleteTicketModal({}) {
  const router = useRouter();
  const { ticketId } = router.query;

  const [onDeleteProcess, setOnDeleteProcess] = useState(false);

  const handleDeleteTicket = async () => {
    setOnDeleteProcess(true);
    if (!ticketId || onDeleteProcess) return;

    const { response, error } = await ticketsApi.deleteUserTicket({
      ticketId,
    });

    if (response) {
      toast.success("Tiket berhasil dihapus. Halaman akan dimuat ulang.");
      // Reload after 3 seconds
      setTimeout(() => {
        router.reload();
        setOnDeleteProcess(false);
      }, 3000);
    }
    if (error) toast.error(error);
  };

  return (
    <dialog id="confirm_delete_ticket_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <IoWarningOutline className="text-center w-full text-6xl" />

        <h4 className="mt-4 text-center text-lg">
          Apakah kamu yakin ingin menghapus tiket ini?
        </h4>

        <div className="mt-4 flex justify-center items-center gap-5">
          <button
            onClick={handleDeleteTicket}
            disabled={onDeleteProcess}
            className={`w-1/3 py-2.5 text-white font-medium text-center bg-red-600 hover:bg-red-800 rounded-lg border border-red-700 ${
              onDeleteProcess ? "brightness-75" : ""
            }`}
          >
            Iya
          </button>

          <form method="dialog" className="w-1/3">
            <button className="w-full py-2.5 text-gray-900 font-medium text-center bg-gray-100 hover:bg-gray-300 rounded-lg border border-gray-300">
              Tidak
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
