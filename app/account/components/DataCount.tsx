
interface IDataCount {
    day: number;
    week: number;
    month: number;
}

export default function DataCount(props: IDataCount) {

return (<div className="flex justify-center">
        <div>
            <div>Day</div>
            <div>₹{props.day}</div>
        </div>
        <div className="ml-5">
            <div>Week</div>
            <div>₹{props.week}</div>
        </div>
        <div className="ml-5">
            <div>Month</div>
            <div>₹{props.month}</div>
        </div>
    </div>)
}