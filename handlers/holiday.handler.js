// handlers/holiday.handler.js
import Holiday from "../models/Holiday.js";

export const holidayHandler = async () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday

 if (day === 0 || day === 6) {
  return "College is closed today (Weekend)";
}

  // ✅ Poore din ka range banao
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);      // 2026-04-10T00:00:00.000Z

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);   // 2026-04-10T23:59:59.999Z

  const holiday = await Holiday.findOne({
    date: { $gte: startOfDay, $lte: endOfDay },  // ✅ Range check
    isHoliday: true,
  });

  if (holiday) {
    return `College is closed today due to ${holiday.title}`;
  }

  return "College is open today";
};