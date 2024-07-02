import ticketsApi from "@/api/modules/tickets.api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Input from "../functions/Input";
import LoadingButton from "../functions/LoadingButton";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function BuyerDataModal({
  adulTicketCount,
  childTicketCount,
  carCount,
  motorcycleCount,
  selectedDate,
}) {
  const router = useRouter();

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const bookingTicketForm = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama harus diisi"),
      phoneNumber: Yup.string().required("Nomor telepon harus diisi"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email harus diisi"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;

      setIsOnRequest(true);
      const totalPrice =
        adulTicketCount * 10000 +
        childTicketCount * 5000 +
        carCount * 3000 +
        motorcycleCount * 2000;

      const { response, error } = await ticketsApi.bookTickets({
        adultCount: adulTicketCount,
        childCount: childTicketCount,
        carCount,
        motorcycleCount,
        totalPrice,
        visitDate: selectedDate,
        buyerName: values.name,
        buyerPhoneNumber: values.phoneNumber,
        buyerEmail: values.email,
      });

      if (response) {
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
              email: values.email,
              name: values.name,
              visitDate: format(selectedDate, "eeee, dd-MM-yyyy", {
                locale: id,
              }),
              adultCount: adulTicketCount,
              childCount: childTicketCount,
              carCount,
              motorcycleCount,
              totalPrice: formatRupiah(totalPrice),
              newTicketLink: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/${response.id}`,
            },
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
          );
        } catch (emailError) {
          setErrorMessage("Gagal mengirim email. Silahkan coba lagi.");
          setIsOnRequest(false);
          return;
        }

        bookingTicketForm.resetForm();
        document.getElementById("buyer_data_modal").close();
        toast.success("Tiket berhasil disimpan. Halaman akan direfresh...");
        setTimeout(() => {
          setIsOnRequest(false);
          router.reload();
        }, 3000);
      }
      if (error) {
        setErrorMessage(error.message);
        setIsOnRequest(false);
      }
    },
  });

  const formatRupiah = (angka) => {
    let reverse = angka.toString().split("").reverse().join("");
    let ribuan = reverse.match(/\d{1,3}/g);
    let hasil = ribuan.join(".").split("").reverse().join("");
    return `Rp. ${hasil}`;
  };

  return (
    <dialog id="buyer_data_modal" className="modal">
      <div className="modal-box bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-semibold text-2xl">Isi Data Diri</h3>

        <form
          className="flex flex-col gap-3 mt-3"
          onSubmit={bookingTicketForm.handleSubmit}
        >
          <Input
            name="name"
            placeholder="John Doe"
            label="Nama"
            type="text"
            value={bookingTicketForm.values.name}
            onChange={bookingTicketForm.handleChange}
            error={
              bookingTicketForm.touched.name &&
              bookingTicketForm.errors.name !== undefined
            }
            helperText={
              bookingTicketForm.touched.name && bookingTicketForm.errors.name
            }
          />
          <Input
            name="phoneNumber"
            placeholder="+62 812 3456 7890"
            label="Nomor Telepon"
            type="text"
            value={bookingTicketForm.values.phoneNumber}
            onChange={bookingTicketForm.handleChange}
            error={
              bookingTicketForm.touched.phoneNumber &&
              bookingTicketForm.errors.phoneNumber !== undefined
            }
            helperText={
              bookingTicketForm.touched.phoneNumber &&
              bookingTicketForm.errors.phoneNumber
            }
          />
          <Input
            name="email"
            placeholder="johndoe@gmail.com"
            label="Email"
            type="email"
            value={bookingTicketForm.values.email}
            onChange={bookingTicketForm.handleChange}
            error={
              bookingTicketForm.touched.email &&
              bookingTicketForm.errors.email !== undefined
            }
            helperText={
              bookingTicketForm.touched.email && bookingTicketForm.errors.email
            }
          />
          <div></div>
          <LoadingButton loading={isOnRequest}>
            Kirim ke Email Saya
          </LoadingButton>
        </form>

        {errorMessage ? (
          <div className="alert bg-red-600 border-red-200 mt-4 text-white text-sm">
            <MdErrorOutline className="text-3xl" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
