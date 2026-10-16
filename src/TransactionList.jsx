import { useState } from 'react'

const TYPE_FILTERS = [
  { value: "all", label: "All" },
  { value: "income", label: "Money in" },
  { value: "expense", label: "Money out" },
];

// "2025-01-10" -> "Jan 10, 2025" (parsed as a local date, so it never shifts a day)
const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <div className="segmented" role="group" aria-label="Filter by type">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.value}
              type="button"
              className="segment"
              aria-pressed={filterType === f.value}
              onClick={() => setFilterType(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select aria-label="Filter by category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat[0].toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="list-empty">No transactions match these filters.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="money">Money in</th>
                <th className="money">Money out</th>
                <th><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="date"><time dateTime={t.date}>{formatDate(t.date)}</time></td>
                  <td className="description">{t.description}</td>
                  <td className="category">{t.category}</td>
                  <td className="money income-amount">
                    {t.type === "income" && `$${t.amount.toLocaleString()}`}
                  </td>
                  <td className="money expense-amount">
                    {t.type === "expense" && `$${t.amount.toLocaleString()}`}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (window.confirm(`Delete "${t.description}"?`)) onDelete(t.id);
                      }}
                      aria-label={`Delete ${t.description}`}
                      title="Delete"
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                        <path
                          d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4M6.75 6.5v4.5M9.25 6.5v4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList
