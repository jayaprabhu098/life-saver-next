import { List as IList } from '../actions/action';
import dayJs from "dayjs";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";

interface ILineChart {
    list: IList[],
    total: number;
}

const colors = ['#FCA5A5', '#FDBA74', '#FDE68A', '#CA8A04'];

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);


export default function Line(
    props: ILineChart
) {
    const data: {
        name: string;
        total: number;
        fill: string;
    }[] = [];

    props.list.forEach(list => {
        const date = dayJs(list.date).format("D");
        const index = data.findIndex(d =>
            d.name === date
        );
        if (index === -1) {
            data.push({
                fill: colors[Math.floor((Math.random() * colors.length - 1) + 1)],
                name: date,
                total: list.amount
            });
        } else {
            data[index].total += list.amount;
        }

    });

    return (
        <Bar
            data={{
                labels: data.map(d => d.name),
                datasets: [
                    {
                        data: data.map(d => d.total),
                        backgroundColor: data.map(d => d.fill),
                        barThickness: 10,   
                    }
                ]
            }}
        />
    );
}