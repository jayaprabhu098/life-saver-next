import { getHealthList } from "../actions/api";
import DataTable from "./components/DataTable";

export default async function Health() {
    const healthList = await getHealthList()
    return (
        <section className="flex flex-col">
            <DataTable list={healthList} />
        </section>
    );
}