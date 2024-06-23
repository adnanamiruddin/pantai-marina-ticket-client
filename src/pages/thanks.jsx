import ticketsApi from "@/api/modules/tickets.api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Thanks() {
  const router = useRouter();
  const { order_id } = router.query;

  useEffect(() => {
    const fetchUpdateTicketStatus = async () => {
      const { response, error } = await ticketsApi.updateTicketStatus({
        ticketId: order_id.split("-")[0],
        status: "paid",
      });

      if (response) {
        router.push("/");
        toast.success("Pembayaran Berhasil");
      }
      if (error) toast.error(error.message);
    };

    if (order_id) fetchUpdateTicketStatus();
  }, [order_id, router]);

  return (
    <div>
      <h1>Thanks {order_id}</h1>
    </div>
  );
}
