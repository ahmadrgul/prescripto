import { format, parse } from "date-fns";

export const time24ToTime12 = (time) =>
  format(parse(time, "HH:mm:ss", new Date()), "hh:mm a");
export const converToVerboseDate = (date) =>
  format(parse(date, "yyyy-MM-dd", new Date()), "do MMMM, yyyy");
