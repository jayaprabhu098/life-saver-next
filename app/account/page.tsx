import Toggle from "./components/Toggle";
import { getAccounts, getCategories, getFiles } from "../actions/api";
import DataTable from "./components/DataTable";
import Add from "./components/Add";
import LineChart from "./components/LineChart";
import DataCount from "./components/DataCount";
import DateFilter from "./components/DateFilter";


export default async function Account({
    searchParams,
}: {
    searchParams: Promise<{ type: string | undefined, date: string | undefined }>;
}) {
    const params = await searchParams;
    const type = Number(params.type);
    const [accounts, categories, files] = await Promise.all([
        getAccounts(type),
        getCategories(type),
        getFiles()
    ])

    return (
        <section className="flex flex-col">
            <div className="self-end mt-5">
                <DateFilter />
            </div>
            <Add type={type} categories={categories} files={files} />
            <Toggle />
            <LineChart accounts={accounts} total={0} />
            <DataCount accounts={accounts} />
            <DataTable accounts={accounts} categories={categories} files={files} />
        </section>
    );
}