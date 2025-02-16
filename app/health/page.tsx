import { getHealthList } from "../actions/api";
import DataTable from "./components/DataTable";
import Add from './components/Add';

export default async function Health() {
    const healthList = await getHealthList()
    return (
        <section className="flex flex-col">
            <Add />
            <DataTable list={healthList} />
        </section>
    );
}