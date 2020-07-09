import moment from "moment";

export default (thisWeek) => {
  const schedule_No= thisWeek? `${Math.round(moment().isoWeek()/2)}` : `${Math.round(moment().isoWeek()/2)+1}`
  //get the first day of this fortnight
  let date =
    moment().isoWeek() % 2 === 0
      ? moment().startOf("isoWeek").subtract(7,"days")
      : moment().startOf("isoWeek").add(7, "days");
  //get the first day of the fortnight based on this schedule or next schedule
  const startDate = thisWeek? moment(date) : moment(date).add(14, "days");
  //get date number of the fortnight
  const dates = [];
  for (let i = 0; i < 14; i++) {
    dates.push(moment(startDate).add(i, "days").format("D"));
  }

  return {
    dates,
    startDate: moment(startDate).format(),
    endDate: moment(startDate).add(13,'days').format(),
    schedule_No  
  }; 
};