import moment from "moment";

export default (isDefault) => {
  const dates = [];
  const defaultDates = []
  const date =
    moment().isoWeek() % 2 === 0
      ? moment().startOf("isoWeek").add(6, "days")
      : moment().startOf("isoWeek").add(13, "days");
  const startDate = moment(date).add(1, "day");
  for (let i = 0; i < 14; i++) {
    dates.push(date.add(1, "days").format("D"));
    defaultDates.push((i+1).toString())
  }
  return {
    dates: isDefault? defaultDates : dates,
    startDate,
    endDate: date,
    schedule_No: isDefault ? "0" : Math.round(moment().isoWeek()/2)+1 
  };
};