import ticketsApi from "@/api/modules/tickets.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";

export default function BuyerTicketDataModal({
  ticketId,
  setSelectedTicketId,
  handleDeleteTicketButtonClicked,
  ticketStatus,
}) {
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

  const handleClose = () => {
    setSelectedTicketId(null);
    setTimeout(() => {
      setIsDataLoaded(false);
    }, 500);
  };

  return (
    <dialog id="buyer_ticket_data_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Informasi</h3>

        {isDataLoaded ? (
          <div className="mt-4">
            <div className="bg-orange-600 w-full text-white font-semibold py-2 px-4 rounded-t-md">
              Data Pembeli
            </div>
            <div className="text-sm">
              <div className="flex">
                <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                  Nama
                </h3>
                <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                  {ticket.buyerName}
                </p>
              </div>
              {/*  */}
              <div className="flex">
                <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                  Nomor Telepon
                </h3>
                <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                  {ticket.buyerPhoneNumber}
                </p>
              </div>
              {/*  */}
              <div className="flex">
                <h3 className="w-[30%] py-2 px-3 border border-gray-300">
                  Email
                </h3>
                <p className="w-[70%] py-2 px-3 border border-gray-300 break-words whitespace-normal">
                  {ticket.buyerEmail}
                </p>
              </div>
            </div>

            {ticketStatus === "cancelled" ? (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    handleDeleteTicketButtonClicked(ticketId);
                  }}
                  className="px-4 py-2 rounded-md bg-red-600 border border-red-300 text-white flex justify-center items-center gap-2"
                >
                  <FaRegTrashAlt className="text-white text-xl" />
                  Hapus
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 flex justify-center items-center h-32">
            <div className="loading loading-bars loading-lg"></div>
          </div>
        )}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
