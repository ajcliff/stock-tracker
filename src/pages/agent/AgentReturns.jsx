import { useState } from "react";

const products = [
  "Dunhill",
  "Embassy",
  "Sportsman",
  "Rothman Blast",
  "Safari",
  "Pallmall"
];

export default function AgentReturns() {
  const [returns, setReturns] = useState({});

  function handleChange(product, value) {
    setReturns({
      ...returns,
      [product]: Number(value)
    });
  }

  function totalReturns() {
    return Object.values(returns).reduce((a, b) => a + b, 0);
  }

  function handleSave() {
    console.log("RETURNS:", returns);
    alert("Returns captured (next step: Firestore)");
  }

  return (
    <div>
      <h2>Agent Returns</h2>

      {products.map((p) => (
        <div key={p}>
          <span>{p}</span>
          <input
            type="number"
            onChange={(e) => handleChange(p, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSave}>
        Save Returns
      </button>

      <h3>Total Returned: {totalReturns()}</h3>
    </div>
  );
}