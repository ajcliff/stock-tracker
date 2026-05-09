import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const agents = [
  "Ronnie Isaac",
  "Bernard Mbula",
  "Edward Kanyi"
];

const products = [
  "Dunhill",
  "Embassy",
  "Sportsman",
  "Rothman Blast",
  "Safari",
  "Pallmall"
];

export default function AllocationForm() {
  const [agent, setAgent] = useState("");
  const [stock, setStock] = useState({});

  function handleChange(product, value) {
    setStock({
      ...stock,
      [product]: Number(value)
    });
  }

 async function handleSave() {
  if (!agent) {
    alert("Select agent first");
    return;
  }

  const payload = {
    agent,
    allocatedStock: stock,
    createdAt: new Date()
  };

  await addDoc(collection(db, "stockAllocations"), payload);

  alert("Allocation saved to Firestore");
}

 return (
  <div>
    <h2>Stock Allocation</h2>

    {/* AGENT SELECT ALWAYS VISIBLE */}
    <select onChange={(e) => setAgent(e.target.value)}>
      <option value="">Select Agent</option>
      {agents.map((a) => (
        <option key={a} value={a}>
          {a}
        </option>
      ))}
    </select>

    <hr />

    {/* ONLY SHOW FORM AFTER AGENT IS SELECTED */}
    {!agent ? (
      <p>Please select an agent to continue</p>
    ) : (
      <>
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
          Save Allocation
        </button>
      </>
    )}
  </div>
);
}