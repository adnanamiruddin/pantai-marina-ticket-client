import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const ticketsEndpoint = {
  tickets: "/tickets",
  ticketByTicketId: ({ ticketId }) => `/tickets/${ticketId}`,

  timetables: "/tickets/timetables",
  visitorReports: "/tickets/visitor-reports",
  ticketIdByBookingCode: ({ bookingCode }) =>
    `/tickets/booking-code/${bookingCode}`,

  cancelTicketByTicketId: ({ ticketId }) => `/tickets/cancel/${ticketId}`,
  paidTickets: "/tickets/paid-tickets",
  payTicketByTicketId: ({ ticketId }) => `/tickets/pay/${ticketId}`,
  confirmPaymentByTicketId: ({ ticketId }) => `/tickets/confirm/${ticketId}`,
  pendingTickets: "/tickets/pending-tickets",
};

const ticketsApi = {
  bookTickets: async ({
    adultCount,
    childCount,
    carCount,
    motorcycleCount,
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
        carCount,
        motorcycleCount,
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

  getAllTickets: async () => {
    try {
      const response = await publicClient.get(ticketsEndpoint.tickets);
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

  deleteTicket: async ({ ticketId }) => {
    try {
      const response = await privateClient.delete(
        ticketsEndpoint.ticketByTicketId({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  //
  getAllTimeTables: async () => {
    try {
      const response = await publicClient.get(ticketsEndpoint.timetables);
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

  cancelTicket: async ({ ticketId }) => {
    try {
      const response = await privateClient.put(
        ticketsEndpoint.cancelTicketByTicketId({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getPaidTickets: async () => {
    try {
      const response = await privateClient.get(ticketsEndpoint.paidTickets);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  payForTicket: async ({ ticketId, proofOfPaymentURL }) => {
    try {
      const response = await publicClient.put(
        ticketsEndpoint.payTicketByTicketId({ ticketId }),
        { proofOfPaymentURL }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  confirmTicket: async ({ ticketId }) => {
    try {
      const response = await privateClient.put(
        ticketsEndpoint.confirmPaymentByTicketId({ ticketId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getPendingTicketsOverHalfHour: async () => {
    try {
      const response = await privateClient.get(ticketsEndpoint.pendingTickets);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default ticketsApi;
