import Seat from "./Seat";

function SeatMap({ tripData, selectedSeats = [], onSeatClick }) {
  if (!tripData) return null;

  const { totalSeats, occupiedSeats = [], availableSeats } = tripData;

  const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  const rows = [];

  for (let i = 0; i < seats.length; i += 4) {
    const row = seats.slice(i, i + 4);

    rows.push([
      row[3] ?? null,
      row[2] ?? null,
      null,
      row[1] ?? null,
      row[0] ?? null,
    ]);
  }

  return (
    <div className="mx-auto w-full max-w-[440px] rounded-t-[120px] bg-[#f0f6f7] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#718493]">مقدمة الحافلة</h3>
        <span>🚌</span>
      </div>

      <div className="mb-6 border-b border-dashed border-[#c8dce1]" />

      <div className="flex flex-col gap-3" dir="ltr">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[1fr_1fr_24px_1fr_1fr] items-center gap-2"
          >
            {row.map((seatNumber, index) => (
              <div key={index}>
                {seatNumber === null ? (
                  <div />
                ) : (
                  <Seat
                    number={seatNumber}
                    status={
                      occupiedSeats.includes(seatNumber)
                        ? "booked"
                        : selectedSeats.includes(seatNumber)
                          ? "selected"
                          : "available"
                    }
                    onClick={() => onSeatClick(seatNumber)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-[#718493]">
        المقاعد المتاحة: {availableSeats - selectedSeats.length}
      </div>
    </div>
  );
}

export default SeatMap;
