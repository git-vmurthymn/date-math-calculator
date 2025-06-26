// Updated: Finalized layout with professional design and compact structure
import { useState, useEffect } from "react";
import {
  addDays,
  addMonths,
  addYears,
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  intervalToDuration,
  format,
  isWeekend
} from "date-fns";

export default function DateMathCalculator() {
  useEffect(() => {
    document.title = "Online Date Mathematics";
  }, []);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amountToChange, setAmountToChange] = useState(0);
  const [operationUnit, setOperationUnit] = useState("days");
  const [resultDate, setResultDate] = useState("");
  const [dateDiff, setDateDiff] = useState(null);
  const [diffUnit, setDiffUnit] = useState("days");
  const [dateFormat, setDateFormat] = useState("yyyy-MM-dd");
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [mode, setMode] = useState("addSub");

  const dateFormats = [
    "yyyy-MM-dd",
    "dd-MM-yyyy",
    "MM-dd-yyyy",
    "dd-MMM-yyyy",
    "dd/MM/yyyy",
    "MM/dd/yyyy",
    "yyyy/MM/dd"
  ];

  const resetInputs = () => {
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setAmountToChange(0);
    setResultDate("");
    setDateDiff(null);
  };

  const parseDateTime = (dateStr, timeStr) => {
    const fullStr = timeStr ? `${dateStr}T${timeStr}` : dateStr;
    return new Date(fullStr);
  };

  const getFormattedDate = (date) => {
    const formattedDate = format(date, dateFormat);
    const formattedTime = format(date, "hh:mm a");
    return `${formattedDate} ${formattedTime}`;
  };

  const addBusinessDays = (date, days) => {
    let count = 0;
    let result = new Date(date);
    while (count < days) {
      result.setDate(result.getDate() + 1);
      if (!isWeekend(result)) count++;
    }
    return result;
  };

  const subBusinessDays = (date, days) => {
    let count = 0;
    let result = new Date(date);
    while (count < days) {
      result.setDate(result.getDate() - 1);
      if (!isWeekend(result)) count++;
    }
    return result;
  };

  const handleAdd = () => {
    if (!startDate || isNaN(amountToChange)) return;
    const baseDate = parseDateTime(startDate, startTime);
    let newDate;
    if (operationUnit === "days") {
      newDate = excludeWeekends ? addBusinessDays(baseDate, Number(amountToChange)) : addDays(baseDate, Number(amountToChange));
    } else if (operationUnit === "months") {
      newDate = addMonths(baseDate, Number(amountToChange));
    } else if (operationUnit === "years") {
      newDate = addYears(baseDate, Number(amountToChange));
    }
    setResultDate(getFormattedDate(newDate));
  };

  const handleSubtract = () => {
    if (!startDate || isNaN(amountToChange)) return;
    const baseDate = parseDateTime(startDate, startTime);
    let newDate;
    if (operationUnit === "days") {
      newDate = excludeWeekends ? subBusinessDays(baseDate, Number(amountToChange)) : subDays(baseDate, Number(amountToChange));
    } else if (operationUnit === "months") {
      newDate = subMonths(baseDate, Number(amountToChange));
    } else if (operationUnit === "years") {
      newDate = subYears(baseDate, Number(amountToChange));
    }
    setResultDate(getFormattedDate(newDate));
  };

  const handleDateDiff = () => {
    if (!startDate || !endDate) return;
    const start = parseDateTime(startDate, startTime);
    const end = new Date(endDate);

    if (diffUnit === "years") {
      const duration = intervalToDuration({ start, end });
      const years = duration?.years ?? 0;
      const months = duration?.months ?? 0;
      const days = duration?.days ?? 0;
      setDateDiff(`${years} Years, ${months} Months, ${days} Days`);
    } else if (diffUnit === "months") {
      const diff = differenceInMonths(end, start);
      setDateDiff(`${diff} Months`);
    } else if (diffUnit === "days") {
      const diff = differenceInDays(end, start);
      setDateDiff(`${diff} Days`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl space-y-6 border border-gray-200">
      <h2 className="text-center text-sm text-gray-500 mb-2">100% free. No data tracking. Built with ❤️ to simplify your day</h2>
      <h1 className="text-3xl font-bold text-center text-blue-800">🧮 Online Date Mathematics</h1>
      <p className="text-center text-gray-600 mb-4">Perform smart date math operations with ease</p>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Mode:</label>
          <div className="flex gap-6 mt-1">
            <label><input type="radio" value="addSub" checked={mode === 'addSub'} onChange={() => { setMode('addSub'); resetInputs(); }} className="mr-2" />Add/Subtract Date</label>
            <label><input type="radio" value="diff" checked={mode === 'diff'} onChange={() => { setMode('diff'); resetInputs(); }} className="mr-2" />Calculate Date Difference</label>
          </div>
        </div>

        {mode === 'addSub' && (
          <>
            <div>
              <label className="block text-sm font-medium text-center mb-1">Please Select Date Format for Date Calculations Output</label>
              <div className="flex justify-center">
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="border rounded p-2 w-1/2 text-center"
                >
                  {dateFormats.map((fmt, idx) => (
                    <option key={idx} value={fmt}>{fmt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Start Time</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Amount to Add/Subtract</label>
                <input type="number" value={amountToChange} onChange={(e) => setAmountToChange(e.target.value)} className="border p-2 rounded w-full" />
              </div>
              <div>
                <label className="block text-sm mb-1">Select Unit</label>
                <select value={operationUnit} onChange={(e) => setOperationUnit(e.target.value)} className="border p-2 rounded w-full">
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
              <div className="col-span-2">
                <label><input type="checkbox" checked={excludeWeekends} onChange={() => setExcludeWeekends(!excludeWeekends)} className="mr-2" />Exclude Weekends</label>
              </div>
              <div className="col-span-2 flex gap-2 items-center">
                <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                <button onClick={handleSubtract} className="bg-red-500 text-white px-4 py-2 rounded">Subtract</button>
                {resultDate && <span className="text-blue-700 font-semibold ml-4">Result: {resultDate}</span>}
              </div>
            </div>
          </>
        )}

        {mode === 'diff' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block text-sm mb-1">Display Result In</label>
              <select value={diffUnit} onChange={(e) => setDiffUnit(e.target.value)} className="border p-2 rounded">
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <div className="flex items-center">
              <button onClick={handleDateDiff} className="bg-blue-600 text-white px-4 py-2 rounded">Calculate</button>
              {dateDiff && <span className="ml-4 text-green-700 font-semibold">Result: {dateDiff}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
