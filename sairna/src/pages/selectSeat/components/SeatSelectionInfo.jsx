import { LuArmchair, LuInfo } from "react-icons/lu";
import Button from "../../../components/shared/Button";
import { useNavigate } from "react-router-dom";
const SeatSelectionInfo = ({ selectedSeats = [], passengerCount = 1,trip }) => {
    const navigate = useNavigate();

  const handleComplete1=()=>{
    navigate(`/bookingLayout/${trip.id}/passengerinfo?passengers=${passengerCount}`)
  }
  return (
    <div className="flex flex-col gap-4">
      {/* Information card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col items-end gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f7f3] text-[#00a99d]">
            <LuArmchair size={27} />
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold text-[#102f46]">مكانك، راحتك.</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              اختر مقعدك حسب تفضيلك، المكان عند الشباب أو بالممر، الخيار إلك.
            </p>
          </div>
        </div>

        <div className="my-5 border-t border-slate-200" />

        {/* Selected seats count */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#00a99d]">
            {selectedSeats.length} / {passengerCount}
          </span>

          <span className="text-sm font-medium text-[#102f46]">
            المقاعد المختارة
          </span>
        </div>

        {/* Selected seats */}
        <div className="mt-5 text-right">
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap justify-end gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="rounded-lg bg-[#e5f7f3] px-3 py-2 text-sm font-semibold text-[#00a99d]"
                >
                  مقعد {seat}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">لسا ما اخترت مقعد</p>
          )}
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#e5f7f3] p-4 text-sm text-[#00a99d]">
        <p className="font-medium">
          أكمل اختيار عدد مقاعد مساوي لعدد المسافرين.
        </p>
        <LuInfo size={21} className="shrink-0" />
      </div>
      <Button
        type="button"
        variant="primary"
        color="primary"
        radius="rounded-[17px]"
        onClick={handleComplete1}
        className=" w-full min-h-[52px] !p-0 flex items-center justify-center"
      > متابعة الحجز</Button>
    </div>
  );
};

export default SeatSelectionInfo;
