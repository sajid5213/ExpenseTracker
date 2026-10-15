import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, CartesianGrid, ResponsiveContainer } from 'recharts';

const BAR_COLOR = "#2a78d6";
const formatMoney = (value) => `$${value}`;

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
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 0 }}>
            <CartesianGrid horizontal={false} stroke="#eee" />
            <XAxis type="number" tickFormatter={formatMoney} stroke="#999" fontSize={12} />
            <YAxis type="category" dataKey="category" width={100} stroke="#999" fontSize={13} tickLine={false} />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Spent"]}
              itemStyle={{ color: "#333" }}
              cursor={{ fill: "#f5f5f5" }}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} radius={[0, 4, 4, 0]} barSize={20}>
              <LabelList dataKey="amount" position="right" formatter={formatMoney} fill="#333" fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
