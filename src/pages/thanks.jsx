import ticketsApi from "@/api/modules/tickets.api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { GiConfirmed } from "react-icons/gi";

export default function ThanksPaymentPage() {
  const router = useRouter();
  const { order_id } = router.query;

  useEffect(() => {
    const fetchUpdateTicketStatus = async () => {
      const { response, error } = await ticketsApi.updateTicketStatus({
        ticketId: order_id.split("-")[0],
        status: "paid",
      });

      if (response) {
        toast.success("Pembayaran Berhasil");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
      if (error) toast.error(error.message);
    };

    if (order_id) fetchUpdateTicketStatus();
  }, [order_id, router]);

  return (
    <div className="mt-2 flex flex-col items-center gap-4 bg-green-500 text-gray-100 p-4 rounded-md font-semibold">
      <GiConfirmed className="text-5xl" />
      <h1 className="text-lg text-center">
        Terima kasih telah melakukan pembayaran
      </h1>
    </div>
  );
}
