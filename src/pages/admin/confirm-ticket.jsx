import AdminPage from "@/components/utils/AdminPage";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Input from "@/components/layouts/functions/Input";
import LoadingButton from "@/components/layouts/functions/LoadingButton";
import { MdErrorOutline } from "react-icons/md";
import ticketsApi from "@/api/modules/tickets.api";
import { toast } from "react-toastify";

export default function ConfirmTicket() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const confirmTicketForm = useFormik({
    initialValues: {
      bookingCode: "",
    },
    validationSchema: Yup.object({
      bookingCode: Yup.string().required("Kode booking tiket harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      const { response: ticketResponse, error: ticketError } =
        await ticketsApi.getTicketIdByBookingCode({
          bookingCode: values.bookingCode,
        });
      if (ticketResponse) {
        const { response, error } = await ticketsApi.updateTicketStatus({
          ticketId: ticketResponse,
          status: "confirmed",
        });
        if (response) {
          confirmTicketForm.resetForm();
          toast.success("Tiket berhasil dikonfirmasi");
          setLoading(false);
        }
        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
        }
      }
      if (ticketError) {
        setErrorMessage(ticketError.message);
        setLoading(false);
      }
    },
  });

  return (
    <ProtectedPage>
      <AdminPage>
        <div className="md:mx-16 md:mt-10">
          <h1 className="text-3xl font-bold">Konfirmasi Tiket</h1>

          <form
            onSubmit={confirmTicketForm.handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <Input
              name="bookingCode"
              placeholder="Kode Booking Tiket"
              type="text"
              value={confirmTicketForm.values.bookingCode}
              onChange={confirmTicketForm.handleChange}
              error={
                confirmTicketForm.touched.bookingCode &&
                confirmTicketForm.errors.bookingCode !== undefined
              }
              helperText={
                confirmTicketForm.touched.bookingCode &&
                confirmTicketForm.errors.bookingCode
              }
            />
            <LoadingButton loading={loading}>Masuk</LoadingButton>
            {errorMessage && (
              <div className="flex items-center gap-2 bg-red-500 text-gray-100 p-4 rounded-md font-semibold">
                <MdErrorOutline className="text-2xl" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </AdminPage>
    </ProtectedPage>
  );
}
