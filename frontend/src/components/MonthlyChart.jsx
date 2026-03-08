import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyChart({ data }) {

  if (!data || data.length === 0) return <p>No hay datos</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`}/>

        <Bar
            dataKey="total"
            fill="#4f46e5"
            barSize={60}
            animationDuration={800}
        />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;