export default function BuyerTicketDataModal({ ticket }) {
  return (
    <dialog id="buyer_ticket_data_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Informasi</h3>

        <div className="mt-4">
          <div className="bg-orange-600 w-full text-white font-semibold py-2 px-4 rounded-t-md">
            Data Pembeli
          </div>
          <div className="text-sm">
            <div className="flex">
              <h3 className="w-[30%] py-2 px-3 border border-gray-300">Nama</h3>
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
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
