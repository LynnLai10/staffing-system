import moment from "moment";

export default () => {
  const dates = [];
  const date =
    moment().isoWeek() % 2 === 0
      ? moment().startOf("isoWeek").add(6, "days")
      : moment().startOf("isoWeek").add(13, "days");
  const startDate = moment(date).add(1, "day");
  for (let i = 0; i < 14; i++) {
    dates.push(date.add(1, "days").format("D"));
  }
  return {
    dates,
    startDate,
    endDate: date,
    schedule_No: Math.round(moment().isoWeek()/2)+1 
  };
};