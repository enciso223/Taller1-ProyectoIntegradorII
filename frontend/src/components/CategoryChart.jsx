import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444"];

function CategoryChart({ data }) {

  if (!data || data.length === 0) return <p>No hay datos</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            outerRadius={100}
            label={({ value }) => `$${value.toLocaleString()}`}
            animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryChart;