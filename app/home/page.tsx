import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import PieChart from "./components/PieChart";
import DateFilter from "./components/DateFilter";
import { getStartDateAndEndDate } from "../actions/util";
dayjs.extend(customParseFormat);

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ year?: number, month?: number }>;
}) {
    const { month, year } = await searchParams;
    getStartDateAndEndDate(month, year)
    const count = {
        income: 0,
        expense: 0,
        saving: 0
    };

    return (
        <section className="flex flex-col justify-center items-center">

            <div className="self-end mt-5">
                <DateFilter />
            </div>
            <div className="mt-7 h-30">
                <p className="text-2xl font-bold text-center mb-5">Spending</p>
                <PieChart expense={10} income={10} />
            </div>
            <div className="mt-10 flex flex-wrap justify-center text-black">

                <div className="bg-orange-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Balance</div>
                    <div>₹{count.income - count.expense}</div>
                </div>
                <div className="bg-cyan-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Expense</div>
                    <div>₹{count.expense}</div>
                </div>
                <div className="bg-yellow-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Income</div>
                    <div>₹{count.income}</div>
                </div>
            </div>

        </section>
    );
}