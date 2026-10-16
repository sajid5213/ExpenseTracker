import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!description.trim() || !(value > 0)) return;

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: value,
      type,
      category,
      // "en-CA" formats as YYYY-MM-DD in local time (toISOString would use UTC)
      date: new Date().toLocaleDateString("en-CA"),
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="segmented" role="group" aria-label="Type">
          <button
            type="button"
            className="segment segment-expense"
            aria-pressed={type === "expense"}
            onClick={() => setType("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className="segment segment-income"
            aria-pressed={type === "income"}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>
        <input
          type="text"
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="primary-btn">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm
