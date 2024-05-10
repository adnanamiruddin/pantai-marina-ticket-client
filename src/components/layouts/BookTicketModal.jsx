import ticketsApi from "@/api/modules/tickets.api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function BookTicketModal({ selectedDate }) {
  const router = useRouter();

  const [adulTicketCount, setAdultTicketCount] = useState(0);
  const [childTicketCount, setChildTicketCount] = useState(0);

  const handleBookTicket = async () => {
    const { response, error } = await ticketsApi.bookTickets({
      adultCount: adulTicketCount,
      childCount: childTicketCount,
      totalPrice: adulTicketCount * 10000 + childTicketCount * 5000,
      visitDate: selectedDate,
    });

    if (response) {
      toast.success("Tiket berhasil disimpan");
      router.push("/dashboard/my-tickets");
    }
    if (error) toast.error(error.message);
  };

  const handleAdultTicketCount = (type) => {
    type === "+"
      ? setAdultTicketCount(adulTicketCount + 1)
      : setAdultTicketCount(adulTicketCount - 1);
  };

  const handleChildTicketCount = (type) => {
    type === "+"
      ? setChildTicketCount(childTicketCount + 1)
      : setChildTicketCount(childTicketCount - 1);
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return (
    <dialog id="book_ticket_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-semibold text-2xl">Pendaftaran Pemesanan Tiket</h3>

        {selectedDate ? (
          <p className="py-4">
            {format(selectedDate, "eeee, d MMMM yyyy", { locale: id })}
          </p>
        ) : null}

        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="font-semibold text-xl">Tiket Dewasa</p>
            <p className="text-sm">{formatRupiah(adulTicketCount * 10000)}</p>
          </div>

          <div className="flex items-center text-black border-2 border-gray-300 rounded-lg gap-3">
            <button
              className="py-1 px-2 text-orange-600 border-r-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleAdultTicketCount("-")}
            >
              <FaMinus />
            </button>
            <h4 className="text-lg">{adulTicketCount}</h4>
            <button
              className="py-1 px-2 text-orange-600 border-l-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleAdultTicketCount("+")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="font-semibold text-xl">Tiket Anak-Anak</p>
            <p className="text-sm">{formatRupiah(childTicketCount * 5000)}</p>
          </div>

          <div className="flex items-center text-black border-2 border-gray-300 rounded-lg gap-3">
            <button
              className="py-1 px-2 text-orange-600 border-r-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleChildTicketCount("-")}
            >
              <FaMinus />
            </button>
            <h4 className="text-lg">{childTicketCount}</h4>
            <button
              className="py-1 px-2 text-orange-600 border-l-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleChildTicketCount("+")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="font-semibold text-xl">Total Pembayaran</p>
          <p className="font-semibold text-xl">
            {formatRupiah(adulTicketCount * 10000 + childTicketCount * 5000)}
          </p>
        </div>

        <button
          onClick={handleBookTicket}
          className="mt-6 btn bg-orange-500 w-full border-0 text-white text-lg hover:bg-orange-700"
        >
          Simpan
        </button>
      </div>
    </dialog>
  );
}
