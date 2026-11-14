import { FaChair } from "react-icons/fa";

function Seat({ number, status, onClick }) {
  const styles = {
    available: "bg-white border-[#c8dce1] text-[#83aab5]",
    booked: "bg-[#e2eaec] border-[#e2eaec] text-[#bdcbd0]",
    selected: "bg-primary border-primary text-white",
  };

  return (
    <button
      type="button"
      disabled={status === "booked"}
      onClick={onClick}
      className={`relative w-full h-[55px] rounded-xl border
        flex items-center justify-center
        transition duration-200
        ${styles[status]}`}
    >
      <FaChair size={23} />

      <span className="absolute bottom-1 left-1 text-[9px] font-bold">
        {number}
      </span>
    </button>
  );
}

export default Seat;
