import ticketsApi from "@/api/modules/tickets.api";
import { selectUser } from "@/redux/features/userSlice";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmDeleteTicketModal from "./ConfirmDeleteTicketModal";
import { useRouter } from "next/router";

export default function TicketItem({ ticket }) {
  const { user } = useSelector(selectUser);
  const router = useRouter();

  const ticketName = `Tiket Wisata Pantai Marina ${format(
    ticket.visitDate,
    "dd-MM-yyyy"
  )}`;

  const handlePayForTicket = async () => {
    const { response, error } = await ticketsApi.payForTicketByTicketId({
      ticketId: ticket.ticketId + ~~(Math.random() * 100) + 1,
      ticketName,
      price: ticket.transaction.totalPrice,
      quantity: ticket.adultCount + ticket.childCount,
    });

    if (response) window.snap.pay(response);
    if (error) toast.error(error);
  };

  const handleOpenConfirmDeleteModal = async () => {
    document.getElementById("confirm_delete_ticket_modal").showModal();
    const ticketId = ticket.ticketId;
    router.push(
      {
        pathname: "/dashboard/my-tickets",
        query: { ticketId },
      },
      undefined,
      { shallow: true }
    );
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return (
    <div className="shadow-md border border-gray-200 p-4 rounded">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">Tiket</h2>

        <MdDeleteForever
          onClick={handleOpenConfirmDeleteModal}
          className="text-3xl text-red-600"
        />
        <ConfirmDeleteTicketModal />
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h6 className="text-sm">
            {format(ticket.visitDate, "eeee, dd-MM-yyyy", { locale: id })}
          </h6>
        </div>

        <div className="text-sm px-3 py-0.5 bg-yellow-500 rounded font-medium">
          {ticket.status}
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

      <button
        className="mt-5 w-full bg-orange-500 border-0 text-white text-lg py-3 rounded hover:brightness-110"
        onClick={handlePayForTicket}
      >
        Bayar Sekarang
      </button>
    </div>

    // <div className="card card-compact w-full bg-gray-100 shadow-xl mb-8">
    //   <figure>
    //     <Image
    //       src="/carousel_img1.png"
    //       width={100}
    //       height={100}
    //       alt="Shoes"
    //       className="w-full h-32"
    //     />
    //   </figure>

    //   <div className="card-body">
    //     <button onClick={handleDeleteTicket} className="self-end text-4xl">
    //       <MdDeleteForever />
    //     </button>

    //     <h2 className="card-title">
    //       Tanggal Kunjungan: {format(ticket.visitDate, "dd-MM-yyyy")}
    //     </h2>
    //     <div className="badge badge-secondary capitalize mb-4">
    //       {ticket.status}
    //     </div>

    //     <p className="flex items-center">
    //       <IoManSharp className="text-3xl" /> Tiket Dewasa : {ticket.adultCount}
    //     </p>

    //     <p className="mt-2 flex items-center">
    //       <FaChild className="text-3xl" /> Tiket Anak-Anak : {ticket.childCount}
    //     </p>

    //     <div className="card-actions justify-end">
    //       <button onClick={handlePayForTicket} className="btn btn-primary">
    //         Bayar Sekarang ({ticket.transaction.totalPrice})
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
