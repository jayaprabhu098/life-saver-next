import { getSaving, getSavingList } from "../actions/api";
import Add from "./components/Add";
import DataTable from "./components/DataTable";
import { ProcessBar } from "./components/ProcessBar";
import Save from "./components/Save";

export default async function Profile() {
    const saving = await getSaving();
    if (!saving)
        return <div>Page not Found</div>
    const savingList = await getSavingList(saving.id)
    return (
        <section className="flex flex-col ">
            <div className="flex flex-row justify-end">
                <Add saving={saving} />
                <Save saving={saving} />
            </div>
            <ProcessBar saving={saving} list={savingList} />
            <DataTable savings={saving} list={savingList} />
        </section>
    );
}