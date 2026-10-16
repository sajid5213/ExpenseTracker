import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, CartesianGrid, ResponsiveContainer } from 'recharts';

const BAR_COLOR = "#24493f";
const formatMoney = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totalsByCategory = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 0 }}>
            <CartesianGrid horizontal={false} stroke="#dce1e7" />
            <XAxis type="number" tickFormatter={formatMoney} stroke="#5a6578" fontSize={13} />
            <YAxis type="category" dataKey="category" style={{ textTransform: "capitalize" }} width={100} stroke="#5a6578" fontSize={14} tickLine={false} />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Spent"]}
              itemStyle={{ color: "#1c2b4a" }}
              cursor={{ fill: "#f1f3f6" }}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} radius={[0, 4, 4, 0]} barSize={20}>
              <LabelList dataKey="amount" position="right" formatter={formatMoney} fill="#1c2b4a" fontSize={14} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
