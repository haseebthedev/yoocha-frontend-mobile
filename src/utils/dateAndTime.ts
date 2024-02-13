import moment from "moment";

export const formatDate = (date: string | Date) => {
  return moment(date).fromNow();
};

export const formatDateToDMY = (date: string | Date) => {
  return moment(date).format("DD/MM/YYYY");
};
