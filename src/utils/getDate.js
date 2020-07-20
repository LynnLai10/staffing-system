import moment from "moment";

export default (thisWeek) => {
  const now = moment()
  const schedule_No= (thisWeek? `${Math.round(now.isoWeek()/2)}` : `${Math.round(now.isoWeek()/2)+1}`) + `-${now.year()}`
  //get the first day of this fortnight
  let date =
    now.isoWeek() % 2 === 0
      ? now.startOf("isoWeek").subtract(7,"days")
      : now.startOf("isoWeek");
  //get the first day of the fortnight based on this schedule or next schedule
  const startDate = thisWeek? moment(date) : moment(date).add(14, "days");
  //get date number of the fortnight
  const dates = [];
  for (let i = 0; i < 14; i++) {
    dates.push(moment(startDate).add(i, "days").format("D"));
  }
  //should disable freetime
  const freetimeDisabled = now.isoWeek() % 2 === 0 && now.isoWeekday() === 7
  
  return {
    dates,
    startDate: moment(startDate).format(),
    endDate: moment(startDate).add(13,'days').format(),
    schedule_No,
    freetimeDisabled 
  }; 
};