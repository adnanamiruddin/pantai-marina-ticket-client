import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const ticketsEndpoint = {
  tickets: "/tickets",
  timetables: "/tickets/timetables",
  payTicketByTicketId: ({ ticketId }) => `/tickets/pay/${ticketId}`,
  ticketIdByBookingCode: ({ bookingCode }) =>
    `/tickets/booking-code/${bookingCode}`,
  ticketByTicketId: ({ ticketId }) => `/tickets/${ticketId}`,
  userTickets: "/tickets/user-tickets",
  visitorReports: "/tickets/visitor-reports",
};

const ticketsApi = {
  bookTickets: async ({
    adultCount,
    childCount,
    totalPrice,
    visitDate,
    buyerName,
    buyerPhoneNumber,
    buyerEmail,
  }) => {
    try {
      const response = await publicClient.post(ticketsEndpoint.tickets, {
        adultCount,
        childCount,
        totalPrice,
        visitDate,
        buyerName,
        buyerPhoneNumber,
        buyerEmail,
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

  getTicketByTicketId: async ({ ticketId }) => {
    try {
      const response = await publicClient.get(
        ticketsEndpoint.ticketByTicketId({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  payForTicketByTicketId: async ({ ticketId, ticketName, price, quantity }) => {
    try {
      const response = await publicClient.post(
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

  getTicketIdByBookingCode: async ({ bookingCode }) => {
    try {
      const response = await privateClient.get(
        ticketsEndpoint.ticketIdByBookingCode({ bookingCode })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateTicketStatus: async ({ ticketId, status }) => {
    try {
      const response = await publicClient.put(
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

  getAllTickets: async () => {
    try {
      const response = await publicClient.get(ticketsEndpoint.tickets);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  cancelTicket: async ({ ticketId }) => {
    try {
      const response = await publicClient.delete(
        ticketsEndpoint.ticketByTicketId({ ticketId })
      );
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
