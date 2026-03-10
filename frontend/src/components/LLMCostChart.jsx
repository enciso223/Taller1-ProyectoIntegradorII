import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function LLMCostChart({ data }) {

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="cost"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 6 }}
        />
        
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LLMCostChart;