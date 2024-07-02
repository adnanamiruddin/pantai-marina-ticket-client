import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import BuyerDataModal from "./BuyerDataModal";
import { toast } from "react-toastify";

export default function BookTicketModal({ selectedDate }) {
  const [adulTicketCount, setAdultTicketCount] = useState(0);
  const [childTicketCount, setChildTicketCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [motorcycleCount, setMotorcycleCount] = useState(0);

  const handleAdultTicketCount = (type) => {
    if (type === "-" && adulTicketCount === 0) return;
    type === "+"
      ? setAdultTicketCount(adulTicketCount + 1)
      : setAdultTicketCount(adulTicketCount - 1);
  };

  const handleChildTicketCount = (type) => {
    if (type === "-" && childTicketCount === 0) return;
    type === "+"
      ? setChildTicketCount(childTicketCount + 1)
      : setChildTicketCount(childTicketCount - 1);
  };

  const handleCarCount = (type) => {
    if (type === "-" && carCount === 0) return;
    type === "+" ? setCarCount(carCount + 1) : setCarCount(carCount - 1);
  };

  const handleMotorcycleCount = (type) => {
    if (type === "-" && motorcycleCount === 0) return;
    type === "+"
      ? setMotorcycleCount(motorcycleCount + 1)
      : setMotorcycleCount(motorcycleCount - 1);
  };

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  const handleNextButtonClicked = () => {
    if (adulTicketCount === 0 && childTicketCount === 0) return;

    if (adulTicketCount + childTicketCount > 50) {
      toast.error("Maksimal pembelian tiket adalah 50 tiket");
      return;
    }

    document.getElementById("book_ticket_modal").close();
    document.getElementById("buyer_data_modal").showModal();
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
          {/*  */}
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
          {/*  */}
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

        <div className="divider divider-warning"></div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="font-semibold text-xl">Tiket Parkir Mobil</p>
            <p className="text-sm">{formatRupiah(carCount * 3000)}</p>
          </div>
          {/*  */}
          <div className="flex items-center text-black border-2 border-gray-300 rounded-lg gap-3">
            <button
              className="py-1 px-2 text-orange-600 border-r-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleCarCount("-")}
            >
              <FaMinus />
            </button>
            <h4 className="text-lg">{carCount}</h4>
            <button
              className="py-1 px-2 text-orange-600 border-l-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleCarCount("+")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="font-semibold text-xl">Tiket Parkir Motor</p>
            <p className="text-sm">{formatRupiah(motorcycleCount * 2000)}</p>
          </div>
          {/*  */}
          <div className="flex items-center text-black border-2 border-gray-300 rounded-lg gap-3">
            <button
              className="py-1 px-2 text-orange-600 border-r-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleMotorcycleCount("-")}
            >
              <FaMinus />
            </button>
            <h4 className="text-lg">{motorcycleCount}</h4>
            <button
              className="py-1 px-2 text-orange-600 border-l-2 border-gray-300 hover:text-orange-800"
              onClick={() => handleMotorcycleCount("+")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="font-semibold text-xl">Total Pembayaran</p>
          <p className="font-semibold text-xl">
            {formatRupiah(
              adulTicketCount * 10000 +
                childTicketCount * 5000 +
                carCount * 3000 +
                motorcycleCount * 2000
            )}
          </p>
        </div>

        <button
          onClick={handleNextButtonClicked}
          className={`mt-6 btn bg-orange-500 w-full border-0 text-white text-lg hover:bg-orange-700 ${
            adulTicketCount === 0 && childTicketCount === 0
              ? "cursor-not-allowed brightness-75"
              : ""
          }`}
        >
          Selanjutnya
        </button>

        <BuyerDataModal
          adulTicketCount={adulTicketCount}
          childTicketCount={childTicketCount}
          carCount={carCount}
          motorcycleCount={motorcycleCount}
          selectedDate={selectedDate}
        />
      </div>
    </dialog>
  );
}
