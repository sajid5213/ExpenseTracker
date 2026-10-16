// Engraved banknote-style line pattern: interlaced sine waves, computed once.
const ENGRAVING = Array.from({ length: 16 }, (_, i) => {
  const phase = (i * Math.PI) / 8;
  const points = [];
  for (let x = 0; x <= 600; x += 5) {
    const t = (x / 600) * Math.PI * 2;
    const y = 100 + 72 * Math.sin(t * 3 + phase) * (0.55 + 0.45 * Math.cos(t + phase / 2));
    points.push(`${x},${y.toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
});

const formatMoney = (value) => `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString()}`;

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section className="summary" aria-label="Summary">
      <div className="summary-balance">
        <svg className="engraving" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
          {ENGRAVING.map((d, i) => (
            <path key={i} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <h2>Balance</h2>
        <p className={balance < 0 ? "balance-amount expense-amount" : "balance-amount"}>{formatMoney(balance)}</p>
      </div>
      <dl className="summary-totals">
        <div>
          <dt>Money in</dt>
          <dd className="income-amount">{formatMoney(totalIncome)}</dd>
        </div>
        <div>
          <dt>Money out</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary
