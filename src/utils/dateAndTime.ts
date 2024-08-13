import moment from "moment";

export const formatDate = (date: string | Date) => {
  return moment(date).fromNow();
};

export const formatDateToDMY = (date: string | Date) => {
  return moment(date).format("MM-DD-YYYY");
};

export const formatTime = (dateTimeString: Date, format: string = "hh:mm A") => {
  const datetime = moment(dateTimeString);
  return datetime.format(format);
};
