import ticketsApi from "@/api/modules/tickets.api";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VisitorReports() {
  const [visitorReports, setVisitorReports] = useState([]);

  useEffect(() => {
    const fetchTimetables = async () => {
      const { response, error } = await ticketsApi.getVisitorReports();
      if (response) {
        console.log(response);
        setVisitorReports(response);
      }
      if (error) toast.error(error);
    };
    fetchTimetables();
  }, []);

  return (
    <ProtectedPage>
      <h2 className="text-3xl font-bold mt-1 mb-3">Laporan Pengunjung</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-black text-base">
            <tr>
              <th>No</th>
              <th>Tanggal Kunjungan</th>
              <th>Anak-Anak</th>
              <th>Dewasa</th>
              <th>Total Pengunjung</th>
            </tr>
          </thead>
          <tbody>
            {visitorReports.map((visitorReport, index) => (
              <tr
                key={visitorReport.id}
                className="hover:bg-gray-300 text-center"
              >
                <td>{index + 1}</td>
                <td>
                  {format(visitorReport.visitDate, "dd MMMM yyyy", {
                    locale: id,
                  })}
                </td>
                <td>{visitorReport.childCount}</td>
                <td>{visitorReport.adultCount}</td>
                <td>{visitorReport.totalVisitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedPage>
  );
}
