import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";
import SectionHeading from "../../components/shared/SectionHeading";
import SearchForm from "../../components/shared/SearchForm";
import CompanyPicker from "./components/CompanyPicker";
import FiltersSidebar from "./components/FiltersSidebar";
import TripCard from "./components/TripCard";
import { useGetTrips } from "../../api/trips";
import { FaCalendarAlt, FaArrowLeft, FaSortAmountDown } from "react-icons/fa";

function Booking() {
  const [searchParams] = useSearchParams();
  
  // const [selectedCompany, setSelectedCompany] = useState('all');
  const initialCompany = searchParams.get('companyId') || 'all';
const [selectedCompany, setSelectedCompany] = useState(initialCompany);
  const [sortBy, setSortBy] = useState('earliest');
  const [selectedTime, setSelectedTime] = useState('all');

  const originId = searchParams.get("from");
  const destinationId = searchParams.get("to");
  const date = searchParams.get("date");
  const passengersParam = Number(searchParams.get("passengers"));

  const passengerCount =
    Number.isInteger(passengersParam) && passengersParam > 0
      ? passengersParam
      : 1;

  const apiParams = {
    originId: originId || undefined,
    destinationId: destinationId || undefined,
    date: date || undefined,
  };

  const { data: trips, isLoading, isError } = useGetTrips(apiParams);

  // الفلترة والترتيب
  const filteredAndSortedTrips = useMemo(() => {
    if (!trips) return [];

    let result = [...trips];

    // 1. الفلترة حسب الشركة
    if (selectedCompany !== "all") {
      result = result.filter(
        (trip) => trip.company.id.toString() === selectedCompany.toString(),
      );
    }

    // 2. الفلترة حسب الوقت
    if (selectedTime !== "all") {
      result = result.filter((trip) => {
        const hour = new Date(trip.departureAt).getHours();
        if (selectedTime === "morning") return hour < 12;
        if (selectedTime === "afternoon") return hour >= 12 && hour < 17;
        if (selectedTime === "evening") return hour >= 17;
        return true;
      });
    }

    // 3. الترتيب
    if (sortBy === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "shortest") {
      result.sort((a, b) => {
        const durA = new Date(a.arrivalAt) - new Date(a.departureAt);
        const durB = new Date(b.arrivalAt) - new Date(b.departureAt);
        return durA - durB;
      });
    } else {
      result.sort((a, b) => new Date(a.departureAt) - new Date(b.departureAt));
    }

    return result;
  }, [trips, selectedCompany, selectedTime, sortBy]);

  return (
    <main className="bg-bg-main min-h-screen pb-16">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb />

        <div className="mb-8">
          <SectionHeading
            eyebrow="لنكمل الطريق"
            title="اختار الرحلة"
            highlight="اللي بتشبهك."
            subtitle="قارن بين الشركات والأوقات، واحجز مقعدك بكل سهولة."
            align="right"
            size="md"
          />
        </div>

        <div className="mb-10 bg-surface p-4 md:p-6 rounded-2xl shadow-sm border border-border">
          <SearchForm />
        </div>

        <CompanyPicker
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
        />

        {/* العناوين والترتيب */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-border pb-4 gap-4">
          <div>
            {!originId || !destinationId || !date ? (
              <h2 className="text-xl font-bold text-text">
                {destinationId
                  ? "تم اختيار الوجهة. يرجى تحديد نقطة الانطلاق والتاريخ."
                  : originId
                    ? "تم اختيار نقطة الانطلاق. يرجى تحديد الوجهة والتاريخ."
                    : "يرجى تحديد نقطة الانطلاق والوجهة والتاريخ لعرض الرحلات."}
              </h2>
            ) : isLoading ? (
              <h2 className="text-xl font-bold text-muted">
                جاري البحث عن رحلات...
              </h2>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-text">
                  {filteredAndSortedTrips?.length > 0
                    ? `${filteredAndSortedTrips.length} رحلات متاحة`
                    : "لا توجد رحلات متاحة"}
                </h2>

                {filteredAndSortedTrips?.length > 0 && (
                  <span className="text-primary text-sm font-bold flex items-center gap-2 bg-soft-teal px-3 py-1 rounded-full">
                    {filteredAndSortedTrips[0].origin.name}{" "}
                    <FaArrowLeft size={12} />{" "}
                    {filteredAndSortedTrips[0].destination.name}
                  </span>
                )}
              </div>
            )}

            {date && (
              <p className="text-sm text-muted flex items-center gap-2 mt-2">
                <FaCalendarAlt /> {date} · {passengerCount} مسافر
              </p>
            )}
          </div>

          {filteredAndSortedTrips?.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted font-bold flex items-center gap-1">
                <FaSortAmountDown /> ترتيب حسب
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border bg-surface rounded-lg px-3 py-2 font-bold outline-none cursor-pointer focus:border-primary"
              >
                <option value="earliest">وقت الانطلاق</option>
                <option value="cheapest">أقل سعر</option>
                <option value="shortest">أقصر مدة</option>
              </select>
            </div>
          )}
        </div>

        {/* توزيع الشريط الجانبي والكروت */}
        {!originId || !destinationId || !date ? null : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* الشريط الجانبي (رح يظهر دايماً بعد البحث) */}
            <div className="lg:col-span-1">
              <FiltersSidebar
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                trips={trips || []}
              />
            </div>

            {/* الكروت أو رسالة عدم وجود رحلات */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-10 text-muted">
                  جاري تحميل الرحلات...
                </div>
              ) : filteredAndSortedTrips?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredAndSortedTrips.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      passengerCount={passengerCount}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-surface/50">
                  <h3 className="text-xl font-bold text-text mb-2">
                    ما في رحلات مطابقة
                  </h3>
                  <p className="text-muted">
                    جرّب تغير الشركة أو وقت الانطلاق.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Booking;
