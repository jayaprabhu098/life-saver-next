import { getCategories, getFiles } from "../actions/api";
import DataTable from "./components/DataTable";
import Toggle from "./components/Toggle";
import Add from "./components/Add";

export default async function Categories({
    searchParams,
}: {
    searchParams: Promise<{ type: string | undefined }>;
}) {
    const params = await searchParams;
    const type = Number(params.type)
    const categories = await getCategories(type);
    const files = await getFiles();

    return (
        <section className="flex flex-col">
            <Toggle />
            <Add type={type}/>            
            <DataTable categories={categories} files={files} />
        </section>
    );
}