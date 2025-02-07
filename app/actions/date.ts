import dayjs from "dayjs";

export const getStartDateAndEndDate = (month?: number, year?: number) => {
    let date = dayjs();
    if (month)
       date = date.set('month', Number(month) - 1);
    if (year)
        date = date.set('year', Number(year));
    const startDate = date.startOf('month').startOf('day').toDate();
    const endDate = date.endOf('month').endOf('day').toDate();
    console.log(startDate, month)
    console.log(endDate)
    return { startDate, endDate };

};

export const getMonthWeekDayDate = () => {
    const date = dayjs();
    const startMonthDate = date.startOf('month').startOf('day').toDate();
    const endMonthDate = date.endOf('month').endOf('day').toDate();
    const startWeekDate = date.startOf('week').startOf('day').toDate();
    const endWeekDate = date.endOf('week').endOf('day').toDate();
    const startDayDate = date.startOf('day').toDate();
    const endDayDate = date.endOf('day').toDate();
    
    return {
        startMonthDate,
        endMonthDate,
        startWeekDate,
        endWeekDate,
        startDayDate,
        endDayDate
    }

};