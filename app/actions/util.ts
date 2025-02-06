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