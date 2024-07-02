import ticketsApi from "@/api/modules/tickets.api";
import GlobalLoading from "@/components/layouts/globals/GlobalLoading";
import AdminPage from "@/components/utils/AdminPage";
import ProtectedPage from "@/components/utils/ProtectedPage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HomeAdmin() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [visitorReports, setVisitorReports] = useState([]);

  useEffect(() => {
    const fetchVisitorReports = async () => {
      const { response, error } = await ticketsApi.getVisitorReports();
      if (response) {
        const sortedReports = response.sort(
          (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
        );
        setVisitorReports(sortedReports);
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 3000);
      }
      if (error) toast.error(error.message);
    };
    fetchVisitorReports();
  }, []);

  return (
    <ProtectedPage>
      <AdminPage>
        {isDataLoaded ? (
          <div className="pb-10 md:mx-16 md:mt-10">
            <h1 className="text-3xl font-bold">Laporan Pengunjung</h1>

            {visitorReports.length > 0 ? (
              <div className="mt-6 overflow-x-auto md:mt-8">
                <table className="table">
                  <thead className="bg-orange-500">
                    <tr className="text-base text-white md:text-lg">
                      <th>No.</th>
                      <th>Tanggal Kunjungan</th>
                      <th>Pengunjung Dewasa</th>
                      <th>Pengunjung Anak-Anak</th>
                      <th>Mobil</th>
                      <th>Motor</th>
                      <th>Total Pengunjung</th>
                      <th>Sisa Kuota</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visitorReports.map((visitorReport, index) => (
                      <tr
                        key={visitorReport.id}
                        className="text-base text-black odd:bg-gray-100 even:bg-gray-200"
                      >
                        <td>{index + 1}.</td>
                        <td>
                          {format(visitorReport.visitDate, "eeee, dd-MM-yyyy", {
                            locale: id,
                          })}
                        </td>
                        <td>
                          <p className="text-center">
                            {visitorReport.adultCount}
                          </p>
                        </td>
                        <td>
                          <p className="text-center">
                            {visitorReport.childCount}
                          </p>
                        </td>
                        <td>
                          <p className="text-center">
                            {visitorReport.carCount}
                          </p>
                        </td>
                        <td>
                          <p className="text-center">
                            {visitorReport.motorcycleCount}
                          </p>
                        </td>
                        <td>
                          <p className="text-center">
                            {visitorReport.totalVisitors}
                          </p>
                        </td>
                        <td>
                          <p className="text-center">{visitorReport.quota}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="md:text-base">
                      <th>No.</th>
                      <th>Tanggal Kunjungan</th>
                      <th>Pengunjung Dewasa</th>
                      <th>Pengunjung Anak-Anak</th>
                      <th>Mobil</th>
                      <th>Motor</th>
                      <th>Total Pengunjung</th>
                      <th>Sisa Kuota</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : null}
          </div>
        ) : (
          <GlobalLoading />
        )}
      </AdminPage>
    </ProtectedPage>
  );
}
