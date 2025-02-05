import { IAccountSchema } from "@/app/actions/type";
import dayjs from "dayjs";

interface IDataCount {
    accounts: IAccountSchema[];
}

export default function DataCount(props: IDataCount) {
    const count = {
        day: 0,
        week: 0,
        month: 0,
    }

    props.accounts.forEach(account => {
        if (dayjs(account.createdAt).isSame(dayjs(), 'day'))
            count.day += account.amount;
        if (dayjs(account.createdAt).isSame(dayjs(), 'month'))
            count.week += account.amount;
        if (dayjs(account.createdAt).isSame(dayjs(), 'month'))
            count.month += account.amount
    })

    return (<div className="flex justify-center">
        <div>
            <div>Day</div>
            <div>₹{count.day}</div>
        </div>
        <div className="ml-5">
            <div>Week</div>
            <div>₹{count.week}</div>
        </div>
        <div className="ml-5">
            <div>Month</div>
            <div>₹{count.month}</div>
        </div>
    </div>)
}