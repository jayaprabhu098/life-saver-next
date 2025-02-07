import { getAccountByDate, getAccounts, getCategories, getFiles } from "../actions/api";
import DataTable from "./components/DataTable";
import Add from "./components/Add";
import LineChart from "./components/LineChart";
import DataCount from "./components/DataCount";
import DateFilter from "../components/DateFilter";
import Toggle from "../components/Toggle";
import { getMonthWeekDayDate, getStartDateAndEndDate } from "../actions/date";


export default async function Account({
    searchParams,
}: {
    searchParams: Promise<{ type?: string, year?: number, month?: number; }>;
}) {
    const params = await searchParams;
    const type = Number(params.type);
    const { startDate, endDate } = getStartDateAndEndDate(params.month, params.year);
    const dates = getMonthWeekDayDate();
    const [accounts, categories, files, monthCount, weekCount, dayCount] = await Promise.all([
        getAccounts(type, startDate, endDate),
        getCategories(type),
        getFiles(),
        getAccountByDate(type, dates.startMonthDate, dates.endMonthDate),
        getAccountByDate(type, dates.startWeekDate, dates.startWeekDate),
        getAccountByDate(type, dates.startDayDate, dates.startDayDate)
    ]);

    return (
        <section className="flex flex-col">
            <div className="self-end mt-5">
                <DateFilter />
            </div>
            <Add type={type} categories={categories} files={files} />
            <Toggle />
            <LineChart accounts={accounts} />
            <DataCount day={dayCount} month={monthCount} week={weekCount} />
            <DataTable accounts={accounts} categories={categories} files={files} />
        </section>
    );
}