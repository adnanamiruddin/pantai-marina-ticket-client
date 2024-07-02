import { storage } from "@/api/config/firebase.config";
import ticketsApi from "@/api/modules/tickets.api";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";

export default function ShowQrCodeModal({ ticket }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [errorMessageImage, setErrorMessageImage] = useState(null);

  const handleSendProofOfTicketPayment = async () => {
    if (loading) return;
    if (!proofOfPayment) {
      setErrorMessageImage("Bukti pembayaran harus diunggah!");
      return;
    }

    setLoading(true);
    // const ticketName = `Tiket Wisata Pantai Marina ${format(
    //   ticket.visitDate,
    //   "dd-MM-yyyy"
    // )}`;
    let proofOfPaymentURL = "";
    try {
      const storageRef = ref(
        storage,
        `book_images/${proofOfPayment.name + v4()}`
      );
      const upload = await uploadBytes(storageRef, proofOfPayment);
      const downloadUrl = await getDownloadURL(upload.ref);
      proofOfPaymentURL = downloadUrl;
    } catch (error) {
      setErrorMessageImage("Gagal mengunggah bukti pembayaran!");
      setLoading(false);
      return;
    }

    const { response, error } = await ticketsApi.payForTicket({
      ticketId: ticket.id,
      proofOfPaymentURL,
    });
    if (response) {
      toast.success(
        "Bukti pembayaran berhasil dikirim. Halaman akan dimuat ulang..."
      );
      document.getElementById("show_qr_code_modal").close();
      setTimeout(() => {
        router.reload();
        setLoading(false);
      }, 3000);
    }
    if (error) {
      setErrorMessageImage(error.message);
      setLoading(false);
    }
  };

  return (
    <dialog id="show_qr_code_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl">Pembayaran</h3>

        <p className="mt-5">
          Silahkan scan QR Code di bawah lalu lakukan pembayaran sebesar{" "}
          <span className="font-semibold">{ticket.transaction.totalPrice}</span>
        </p>

        <Image
          src="/qr-code-pantai-marina-92398283.jpg"
          alt="QR Code"
          width={500}
          height={500}
          className="mx-auto"
        />

        <div className="divider divider-warning my-10"></div>

        <div className="-mt-6">
          <label className="label">
            <span className="label-text text-black text-lg">
              Silahkan lampirkan bukti pembayaran
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setProofOfPayment(e.target.files[0]);
            }}
            className="mt-1 file-input file-input-bordered file-input-warning w-full bg-gray-50"
          />
          {errorMessageImage ? (
            <p className="mt-1 ms-1 text-sm text-red-500 font-semibold">
              {errorMessageImage}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSendProofOfTicketPayment}
          className={`mt-6 btn bg-orange-500 w-full border-0 text-white text-lg hover:bg-orange-400 ${
            loading ? "brightness-75" : ""
          }`}
        >
          {loading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Kirim"
          )}
        </button>
      </div>
    </dialog>
  );
}
