import ticketsApi from "@/api/modules/tickets.api";
import GlobalLoading from "@/components/layouts/globals/GlobalLoading";
import NotFound from "@/components/layouts/globals/NotFound";
import BuyerTicketDataModal from "@/components/layouts/modals/BuyerTicketDataModal";
import ShowProofOfPaymentModal from "@/components/layouts/modals/ShowProofOfPaymentModal";
import SearchBar from "@/components/layouts/SearchBar";
import TicketItem from "@/components/layouts/TicketItem";
import AdminPage from "@/components/utils/AdminPage";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { useEffect, useState } from "react";

export default function TicketList() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllTickets = async () => {
      const { response, error } = await ticketsApi.getAllTickets();
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
    fetchAllTickets();
  }, []);

  useEffect(() => {
    const filterTickets = () => {
      let filtered = tickets;
      //
      if (searchQuery !== "") {
        filtered = filtered.filter((ticket) =>
          ticket.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      //
      setFilteredTickets(filtered);
    };
    //
    filterTickets();
  }, [searchQuery, tickets]);

  return (
    <ProtectedPage>
      <AdminPage>
        {isDataLoaded ? (
          <div className="pb-10 md:mx-16 md:mt-10">
            <div className="flex justify-between items-center">
              <h1 className="w-1/2 text-3xl font-bold">Daftar Tiket</h1>

              <div className="w-1/3">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </div>

            {filteredTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                {filteredTickets.map((ticket, i) => (
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

            <ShowProofOfPaymentModal
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
