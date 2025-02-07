import PieChart from "./components/PieChart";
import DateFilter from "../components/DateFilter";
import { getStartDateAndEndDate } from "../actions/date";
import { getAccountByDate } from "../actions/api";
import { CategoryType } from "../actions/type";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ year?: number, month?: number; }>;
}) {
    const { month, year } = await searchParams;
    const { startDate, endDate } = getStartDateAndEndDate(month, year);
    const expense = await getAccountByDate(CategoryType.debit, startDate, endDate);
    const income = await getAccountByDate(CategoryType.credit, startDate, endDate);

    return (
        <section className="flex flex-col justify-center items-center">

            <div className="self-end mt-5">
                <DateFilter />
            </div>
            <div className="mt-7 h-30">
                <p className="text-2xl font-bold text-center mb-5">Spending</p>
                <PieChart expense={expense} income={income} />
            </div>
            <div className="mt-10 flex flex-wrap justify-center text-black">

                <div className="bg-orange-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Balance</div>
                    <div>₹{income - expense}</div>
                </div>
                <div className="bg-cyan-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Expense</div>
                    <div>₹{expense}</div>
                </div>
                <div className="bg-yellow-200 rounded-2xl h-28 w-28 flex flex-col justify-center items-center m-2">
                    <div>Income</div>
                    <div>₹{income}</div>
                </div>
            </div>

        </section>
    );
}