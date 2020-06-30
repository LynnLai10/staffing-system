import moment from "moment";

export default (thisWeek) => {
  const schedule_No= thisWeek? `${Math.round(moment().isoWeek()/2)}` : `${Math.round(moment().isoWeek()/2)+1}`
  let date =
    moment().isoWeek() % 2 === 0
      ? moment().startOf("isoWeek").add(6, "days")
      : moment().startOf("isoWeek").add(13, "days");
  const startDate = thisWeek? moment(date).subtract(14, "day") : moment(date).add(1, "day");
  date = moment(startDate)
  const dates = [];
  for (let i = 0; i < 14; i++) {
    dates.push(date.add(1, "days").format("D"));
  }
  return {
    dates,
    startDate: moment(startDate).format(),
    endDate: moment(date).format(),
    schedule_No  
  };
};