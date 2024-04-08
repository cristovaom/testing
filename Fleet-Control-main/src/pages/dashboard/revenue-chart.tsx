import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ComposedChart,
} from "recharts";
import colors from "tailwindcss/colors";
const data = [
  { date: "12/2023", revenue: 3 },
  { date: "11/2023", revenue: 5 },
  { date: "10/2023", revenue: 2 },
  { date: "09/2023", revenue: 1 },
  { date: "08/2023", revenue: 7 },
  { date: "07/2302", revenue: 4 },
  { date: "06/2023", revenue: 2 },
  { date: "05/2023", revenue: 7 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Multas no período
          </CardTitle>
          <CardDescription>Multas mensaís no período</CardDescription>
        </div>

        <div className="flex items-center justify-center gap-4">
          <CardTitle className="text-base font-medium">Período</CardTitle>
          <DatePickerWithRange />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => value.toLocaleString("pt-BR")}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors["violet"]["500"]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
