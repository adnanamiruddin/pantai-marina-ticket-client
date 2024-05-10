import { useEffect, useState } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isEqual,
} from "date-fns";
import { id } from "date-fns/locale";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";
import ticketsApi from "@/api/modules/tickets.api";
import { toast } from "react-toastify";
import BookTicketModal from "./BookTicketModal";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";

export default function Calendar() {
  const { user } = useSelector(selectUser);
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [timetables, setTimetables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchTimetables = async () => {
      const { response, error } = await ticketsApi.getAllTimeTables();
      if (response) setTimetables(response);
      if (error) toast.error(error);
    };
    fetchTimetables();
  }, []);

  const handleDoubleClickDate = (dateClicked) => {
    if (!user) {
      toast.error("Silahkan login terlebih dahulu");
      router.push("/login");
      return;
    }
    document.getElementById("book_ticket_modal").showModal();
    setSelectedDate(dateClicked);
  };

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 7));
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(day);
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }

    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    return (
      <>
        <div id="calendar" className="grid grid-cols-7">
          {dayNames.map((dayName, index) => (
            <div
              key={index}
              className="border border-gray-400 text-center font-semibold"
            >
              {dayName}
            </div>
          ))}
        </div>
        {rows.map((week, index) => (
          <div key={index} className="grid grid-cols-7">
            {week.map((day, dayIndex) => {
              const isQuotaFull = timetables.some(
                (timetable) =>
                  isEqual(timetable.visitDate, day) && timetable.quota === 0
              );
              return (
                <button
                  onDoubleClick={() => handleDoubleClickDate(day)}
                  key={dayIndex}
                  disabled={isQuotaFull}
                  className={`border border-gray-300 flex flex-col items-end h-24 pe-1.5 ${
                    isQuotaFull ? "bg-red-600" : "bg-green-500"
                  }`}
                >
                  <h6>{format(day, "d", { locale: id })}</h6>
                </button>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="mt-12 mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-medium">
          {format(currentDate, "MMMM yyyy", { locale: id })}
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleDoubleClickDate(new Date())}
            className="py-2 px-3 bg-orange-500 w-full border-0 text-white hover:bg-orange-700"
          >
            Hari ini
          </button>

          <div className="flex justify-center items-center">
            <button
              className="p-2.5 bg-orange-500 w-full border-0 text-white hover:bg-orange-700"
              onClick={handlePrevWeek}
            >
              <VscTriangleLeft className="text-xl" />
            </button>

            <button
              className="p-2.5 bg-orange-500 w-full border-0 text-white hover:bg-orange-700"
              onClick={handleNextWeek}
            >
              <VscTriangleRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {renderCalendar()}

      <BookTicketModal selectedDate={selectedDate} />
    </>
  );
}
