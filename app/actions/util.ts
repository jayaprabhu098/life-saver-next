import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);

export const getStartDateAndEndDate = (month?: number, year?: number) => {
    const date = dayjs();
    console.log(month, year)
    if (month)
        date.set('month', Number(month))
    if (year)
        date.set('year', Number(year))
    const startDate = date.startOf('month').startOf('day').toDate();
    console.log(startDate);

}