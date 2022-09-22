import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, subMonths, isSameMonth } from "date-fns";
import { pl } from "date-fns/locale";
import { mocekedSessionsHistory } from "assets/mocks/mockedSessionsHistory";
import { TrainingSessionsHistory } from "models/trainingSessionsModel";
import CustomTooltip from 'components/organisms/Chart/CustomTooltip';

type ChartTypes = {
  dataSessions: TrainingSessionsHistory[];
};

const Chart = ({ dataSessions }: ChartTypes) => {
  const isThisSameMonth = (monthNumber: number) =>
  dataSessions?.filter((item) =>
      isSameMonth(
        new Date(item?.startTrainingDate as number),
        subMonths(new Date(), monthNumber)
      )
    ).length;

  const nameOfMonth = (monthNumber: number) =>
    format(subMonths(new Date(), monthNumber), "LLL", { locale: pl });

  const data = new Array(6)
    .fill(null)
    .map((_, index) => ({
      name: nameOfMonth(index),
      treningi: isThisSameMonth(index),
    }))
    .reverse();

  console.log(data);

  return (
    <ResponsiveContainer width="75%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip payload={data} />} />

        <defs>
          <linearGradient
            id="treningiFill"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#92A3FD" />
            <stop offset="1" stopColor="#9DCEFF" />
          </linearGradient>
        </defs>
        <Bar
          barSize={15}
          dataKey="treningi"
          fill="url(#treningiFill)"
          radius={[15, 15, 15, 15]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
