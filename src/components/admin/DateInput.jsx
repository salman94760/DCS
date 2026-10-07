import { useEffect, useRef, useState } from "react";

export default function DateInput({
  name,
  value = "",
  placeholder = "MM/DD/YYYY",
  className = "",
  title="",
  mandate=false
}) {
  const [displayValue, setDisplayValue] = useState("");
  const dateRef = useRef(null);

  // API se YYYY-MM-DD ko MM/DD/YYYY mein convert
  useEffect(() => {
    if (!value) {
      setDisplayValue("");
      return;
    }

    const parts = value.split("-");

    if (parts.length === 3) {
      const [year, month, day] = parts;

      setDisplayValue(`${month}/${day}/${year}`);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  // MM/DD/YYYY formatting
  const formatDate = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}/${numbers.slice(
      2,
      4
    )}/${numbers.slice(4, 8)}`;
  };

  const handleChange = (e) => {
    setDisplayValue(formatDate(e.target.value));
  };

  // MM/DD/YYYY -> YYYY-MM-DD
  const getBackendDate = () => {
    if (!displayValue) return "";

    const parts = displayValue.split("/");

    if (parts.length !== 3) return "";

    const [month, day, year] = parts;

    if (
      month.length !== 2 ||
      day.length !== 2 ||
      year.length !== 4
    ) {
      return "";
    }

    return `${year}-${month}-${day}`;
  };

  const openCalendar = () => {
    dateRef.current?.showPicker?.();
  };

  const handleCalendarChange = (e) => {
    const date = e.target.value;

    if (!date) {
      setDisplayValue("");
      return;
    }

    const [year, month, day] = date.split("-");

    setDisplayValue(`${month}/${day}/${year}`);
  };

  return (
    <div className="relative w-full">
      {/* User types / pastes MM/DD/YYYY */}
    	<label className="cap block text-sm font-medium text-slate-700 mb-1.5">
        {title}

        {mandate && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={10}
        autoComplete="off"
        className={`w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-11 text-sm outline-none focus:border-blue-500 ${className}`}
      />

      {/* Calendar */}
      <button
        type="button"
        onClick={openCalendar}
        className="absolute right-3 top-[35px]"
      >
        📅
      </button>

      {/* Native calendar */}
      <input
        ref={dateRef}
        type="date"
        value={getBackendDate()}
        onChange={handleCalendarChange}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        tabIndex={-1}
      />

      {/* IMPORTANT:
          FormData ko YYYY-MM-DD value deni hai
      */}
      <input
        type="hidden"
        name={name}
        value={getBackendDate()}
        readOnly
      />
    </div>
  );
}