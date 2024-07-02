import ticketsApi from "@/api/modules/tickets.api";
import GlobalLoading from "@/components/layouts/globals/GlobalLoading";
import NotFound from "@/components/layouts/globals/NotFound";
import BuyerTicketDataModal from "@/components/layouts/modals/BuyerTicketDataModal";
import ConfirmCancelTicketModal from "@/components/layouts/modals/ConfirmCancelTicketModal";
import TicketItem from "@/components/layouts/TicketItem";
import AdminPage from "@/components/utils/AdminPage";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CancelTicket() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  useEffect(() => {
    const fetchPendingTickets = async () => {
      const { response, error } =
        await ticketsApi.getPendingTicketsOverHalfHour();
      if (response) {
        // Sort by createdAt newest to oldest
        const sortedTickets = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTickets(sortedTickets);
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 3000);
      }
      if (error) toast.error(error.message);
    };
    fetchPendingTickets();
  }, []);

  return (
    <ProtectedPage>
      <AdminPage>
        {isDataLoaded ? (
          <div className="pb-10 md:mx-16 md:mt-10">
            <h1 className="text-3xl font-bold leading-snug">
              Tiket yang Belum Dibayar
            </h1>

            <p className="text-sm mt-3">
              *Hanya tiket yang melebihi 30 menit belum dibayar yang ditampilkan
            </p>

            {tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                {tickets.map((ticket, i) => (
                  <TicketItem
                    key={i}
                    ticket={ticket}
                    setSelectedTicketId={setSelectedTicketId}
                  />
                ))}
              </div>
            ) : (
              <NotFound />
            )}

            <ConfirmCancelTicketModal
              ticketId={selectedTicketId}
              setSelectedTicketId={setSelectedTicketId}
            />
            <BuyerTicketDataModal
              ticketId={selectedTicketId}
              setSelectedTicketId={setSelectedTicketId}
            />
          </div>
        ) : (
          <GlobalLoading />
        )}
      </AdminPage>
    </ProtectedPage>
  );
}
