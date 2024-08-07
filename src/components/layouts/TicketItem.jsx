import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/router";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function TicketItem({ ticket, setSelectedTicketId }) {
  const router = useRouter();

  const handleShowProofOfPaymentModalButtonClicked = () => {
    setSelectedTicketId(ticket.id);
    document.getElementById("show_proof_of_payment_modal").showModal();
  };

  const handleCancelTicketButtonClicked = () => {
    setSelectedTicketId(ticket.id);
    document.getElementById("confirm_cancel_ticket_modal").showModal();
  };

  const handleBuyerTicketDataButtonClicked = () => {
    setSelectedTicketId(ticket.id);
    document.getElementById("buyer_ticket_data_modal").showModal();
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return (
    <div className="relative shadow-md border border-orange-300 p-4 rounded">
      <button
        onClick={handleBuyerTicketDataButtonClicked}
        className="absolute top-2.5 right-2.5"
      >
        <IoIosInformationCircleOutline className="text-2xl" />
      </button>

      <h2 className="font-bold text-2xl">{ticket.bookingCode}</h2>

      <div className="mt-4 flex justify-between items-center md:mt-5">
        <h6 className="text-sm">
          {format(ticket.visitDate, "eeee, dd-MM-yyyy", { locale: id })}
        </h6>
        {/*  */}
        <div
          className={`text-sm text-white py-0.5 rounded font-medium md:text-xs ${
            ticket.status === "pending"
              ? "bg-gray-600 px-2"
              : ticket.status === "paid"
              ? "bg-green-600 px-3"
              : ticket.status === "confirmed"
              ? "bg-orange-600 px-3"
              : "bg-red-600 px-3"
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

      {ticket.status === "paid" || ticket.status === "confirmed" ? (
        <button
          onClick={handleShowProofOfPaymentModalButtonClicked}
          className="mt-5 w-full bg-orange-500 border-0 text-white text-lg font-semibold py-3 rounded hover:brightness-110"
        >
          Lihat Bukti Pembayaraan
        </button>
      ) : null}

      {ticket.status === "pending" &&
      router.pathname === "/admin/cancel-ticket" ? (
        <button
          onClick={handleCancelTicketButtonClicked}
          className="mt-5 w-full bg-red-600 border-0 text-white text-lg font-semibold py-3 rounded hover:brightness-110"
        >
          Batalkan Tiket
        </button>
      ) : null}
    </div>
  );
}
