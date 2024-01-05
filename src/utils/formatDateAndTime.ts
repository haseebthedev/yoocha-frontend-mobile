import moment from "moment";

export const formatDate = (date: string | Date) => {
  const originalDate = moment(date);
  const formattedDate = originalDate.fromNow();

  return formattedDate;
};

export const formatDateToDMY = (date: any) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid Date object provided");
  }

  return moment(date).format("DD/MM/YYYY");
};
