import ticketsApi from "@/api/modules/tickets.api";
import TicketItem from "@/components/layouts/TicketItem";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import { selectUser } from "@/redux/features/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function MyTickets() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await ticketsApi.getUserTickets();
      if (response) setTickets(response);
      if (error) toast.error(error);
      dispatch(setGlobalLoading(false));
    };

    if (user) fetchUserTickets();

    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_PAYMENT_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  return (
    <ProtectedPage>
      <h2 className="text-3xl font-bold mt-1 mb-4">Tiket Saya</h2>
      <div className="flex justify-center flex-col gap-6">
        {tickets.length > 0
          ? tickets.map((ticket, i) => <TicketItem key={i} ticket={ticket} />)
          : null}
      </div>
    </ProtectedPage>
  );
}
