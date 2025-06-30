import { addMinutes, format, isBefore, parse } from "date-fns";

const generateSlots = (startTime, endTime, duration) => {
  const today = new Date().toISOString().split("T")[0];

  const start = parse(
    `${today} ${startTime}`,
    "yyyy-MM-dd HH:mm:ss",
    new Date(),
  );
  const end = parse(`${today} ${endTime}`, "yyyy-MM-dd HH:mm:ss", new Date());

  const slots = [];

  let current = start;
  while (isBefore(current, end)) {
    slots.push(format(current, "hh:mm a"));
    current = addMinutes(current, duration);
  }
  return slots;
};

export default generateSlots;
