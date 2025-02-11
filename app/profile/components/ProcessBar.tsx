'use client'
import { ISavingListSchema, ISavingSchema } from '@/app/actions/type';
import { Line } from 'rc-progress';

interface IProcessBar {
    saving: ISavingSchema;
    list: ISavingListSchema[]
}
export function ProcessBar(props: IProcessBar) {
    if (!props.saving) return (<></>)
    const amount = props.list.reduce((a, b) => a + b.amount, 0);
    const processed = amount / (props.saving.target / 100);
    return <section
        className="mb-2 text-sm w-full flex justify-center ">
        <div className="max-w-72">
            <div className="flex mx-1 mb-2 flex-warp justify-between">
                <div>
                    <p>{props.saving.name}</p>
                    <p>{processed}%</p>
                </div>
                <div className="ml-2">
                    <p>Raised</p>
                    <p>{new Intl.NumberFormat('en-IN').format(amount)}</p>
                </div>
                <div className="ml-2">
                    <p>Goals</p>
                    <p>{new Intl.NumberFormat('en-IN').format(props.saving.target)}</p>
                </div>
            </div>
            <Line
                percent={processed}
                trailWidth={4}
                strokeWidth={4}
                className="w-full h-4 rounded-lg"
                strokeColor="#60A5FA"
            />
        </div>

    </section>
}
