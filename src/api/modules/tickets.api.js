import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const ticketsEndpoint = {
  tickets: "/tickets",
  timetables: "/tickets/timetables",
  payTicketByTicketId: ({ ticketId }) => `/tickets/pay/${ticketId}`,
  ticketByTicketId: ({ ticketId }) => `/tickets/${ticketId}`,
  userTickets: "/tickets/user-tickets",
  visitorReports: "/tickets/visitor-reports",
};

const ticketsApi = {
  bookTickets: async ({ adultCount, childCount, totalPrice, visitDate }) => {
    try {
      const response = await privateClient.post(ticketsEndpoint.tickets, {
        adultCount,
        childCount,
        totalPrice,
        visitDate,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllTimeTables: async () => {
    try {
      const response = await publicClient.get(ticketsEndpoint.timetables);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  payForTicketByTicketId: async ({ ticketId, ticketName, price, quantity }) => {
    try {
      const response = await privateClient.post(
        ticketsEndpoint.payTicketByTicketId({ ticketId }),
        {
          ticketName,
          price,
          quantity,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateTicketStatus: async ({ ticketId, status }) => {
    try {
      const response = await privateClient.put(
        ticketsEndpoint.ticketByTicketId({ ticketId }),
        {
          status,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteUserTicket: async ({ ticketId }) => {
    try {
      const response = await privateClient.delete(
        ticketsEndpoint.ticketByTicketId({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getUserTickets: async () => {
    try {
      const response = await privateClient.get(ticketsEndpoint.userTickets);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getVisitorReports: async () => {
    try {
      const response = await privateClient.get(ticketsEndpoint.visitorReports);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default ticketsApi;
