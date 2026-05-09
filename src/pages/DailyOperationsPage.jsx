import { db } from "../firebase";
import AppFooter from "../components/AppFooter";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  addDoc,
  collection
} from "firebase/firestore";
import { useEffect, useState } from "react";


const agents = [
  "Ronnie Isaac",
  "Bernard Mbula",
  "Edward Kanyi"
];

const products = [
  { name: "Dunhill", price: 520 },
  { name: "Embassy", price: 510 },
  { name: "Sportsman", price: 352 },
  { name: "Rothman Blast", price: 261 },
  { name: "Safari", price: 211 },
  { name: "Pallmall", price: 170 }
];

export default function DailyOperationsPage() {
    const [agent, setAgent] = useState("");
 const [allocated, setAllocated] = useState({});
const [returns, setReturns] = useState({});

const [currentAllocated, setCurrentAllocated] = useState({});
const [currentReturns, setCurrentReturns] = useState({});
const [cash, setCash] = useState(0);
const [mpesa, setMpesa] = useState(0);

const [currentCash, setCurrentCash] = useState("");
const [currentMpesa, setCurrentMpesa] = useState("");
const [saving, setSaving] =
  useState(false);
function handleAllocated(product, value) {
  setCurrentAllocated({
    ...currentAllocated,
    [product]: value === "" ? "" : Number(value)
  });
}
function handleReset() {
  setCurrentAllocated({});
  setCurrentReturns({});
  setCurrentCash("");
  setCurrentMpesa("");
}

function handleEndDay() {
  setAllocated({});
  setReturns({});
  setCash("");
  setMpesa("");
  setAgent("");

  alert("Day closed successfully");
}


function handleReturns(product, value) {
  setCurrentReturns({
    ...currentReturns,
    [product]: value === "" ? "" : Number(value)
  });
}

function sold(product) {
  return (
    (allocated[product] || 0) +
    (currentAllocated[product] || 0)
  ) -
  (
    (returns[product] || 0) +
    (currentReturns[product] || 0)
  );
}

function amount(product, price) {
  const packets = sold(product) * 10;

  return packets * price;
}

  function totalAmount() {
    return products.reduce((total, p) => {
      return total + amount(p.name, p.price);
    }, 0);
  }

function totalPaid() {
  return (
    (Number(cash) || 0) +
    (Number(mpesa) || 0) +
    (Number(currentCash) || 0) +
    (Number(currentMpesa) || 0)
  );
}

function totalReturnsAmount() {
  return products.reduce((total, p) => {
    return total + (
      ((returns[p.name] || 0) +
      (currentReturns[p.name] || 0)) * p.price
    );
  }, 0);
}

function totalAllocatedToday(product) {
  return (
    (allocated[product] || 0) +
    (currentAllocated[product] || 0)
  );
}

function debtRemaining() {
  return Math.max(
    0,
    totalAmount() - (
      (Number(cash) || 0) +
      (Number(mpesa) || 0) +
      (Number(currentCash) || 0) +
      (Number(currentMpesa) || 0)
    )
  );
}
const today =
  new Date().toISOString().split("T")[0];

  useEffect(() => {
  if (!agent) return;

  async function loadAgentData() {
    const docId = `${agent}-${today}`;

    const ref = doc(
      db,
      "dailyOperations",
      docId
    );

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const data = snapshot.data();

      setAllocated(data.allocated || {});
      setReturns(data.returns || {});
setCash(data.cashPaid || 0);
setMpesa(data.mpesaPaid || 0);
    }
  }

  loadAgentData();
}, [agent]);


async function handleResetDay() {
  if (!agent) {
    alert("Select an agent first");
    return;
  }

  const docId = `${agent}-${today}`;
  const ref = doc(db, "dailyOperations", docId);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    alert("No data to archive");
    return;
  }

  const data = snapshot.data();

  // save to archive
 const archiveRef = doc(
  db,
  "dailyArchive",
  `${agent}-${today}`
);

await setDoc(archiveRef, {
  ...data,
  archivedAt: new Date()
});
  // remove active daily record
  await deleteDoc(ref);

  // clear UI
setAllocated({});
setReturns({});
setCurrentAllocated({});
setCurrentReturns({});
setCash(0);
setMpesa(0);
setCurrentCash("");
setCurrentMpesa("");
setAgent("");

  alert("Day archived successfully");
}

async function handleSave() {
  if (!agent) {
  alert("Select an agent first");
  return;
}
  const docId = `${agent}-${today}`;

  const ref = doc(db, "dailyOperations", docId);

  const snapshot = await getDoc(ref);

  let previousData = {
    allocated: {},
    returns: {},
    cash: 0,
    mpesa: 0
  };

  if (snapshot.exists()) {
    previousData = snapshot.data();
  }

  const mergedAllocated = {};
  const mergedReturns = {};

  products.forEach((p) => {
    mergedAllocated[p.name] =
      (previousData.allocated?.[p.name] || 0) +
    (currentAllocated[p.name] || 0)

    mergedReturns[p.name] =
      (previousData.returns?.[p.name] || 0) +
     (currentReturns[p.name] || 0)
  });

const mergedCash =
  (previousData.cashPaid || 0) +
(Number(currentCash) || 0)

const mergedMpesa =
  (previousData.mpesaPaid || 0) +
 (Number(currentMpesa) || 0)

const finalTotal = products.reduce((total, p) => {
  const soldQty =
    (mergedAllocated[p.name] || 0) -
    (mergedReturns[p.name] || 0);

  return total + (soldQty * 10 * p.price);
}, 0);

const finalDebt =
  finalTotal - (mergedCash + mergedMpesa);

const payload = {
  agent,
  date: today,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  allocated: mergedAllocated,
  returns: mergedReturns,
  cashPaid: mergedCash,
  mpesaPaid: mergedMpesa,
  totalAmount: finalTotal,
  debt: finalDebt,
  updatedAt: new Date()
};
setSaving(true);
  await setDoc(ref, payload);

setAllocated(mergedAllocated);
setReturns(mergedReturns);

setCurrentAllocated({});
setCurrentReturns({});

setCurrentCash("");
setCurrentMpesa("");
 setSaving(false);
  alert("Restock added successfully");
 
}


return (
<div
  style={{
    padding: 15,
    paddingBottom: 100
  }}
>
      

      <h1>Daily Operations</h1>

      <select
  value={agent}
  onChange={(e) => setAgent(e.target.value)}
>
  <option value="">
    Select Agent
  </option>

  {agents.map((a) => (
    <option key={a} value={a}>
      {a}
    </option>
  ))}
</select>

<hr />

{agent && (
  <>

      <div
  style={{
    overflowX: "auto",
    marginTop: 20
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "650px"
    }}
  >
        <thead>
          <tr>
            <th>Product</th>
<th>New Allocation</th>
<th>Total Today</th>
<th>Returns</th>
<th>Sold</th>
<th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
<tr key={p.name}>
  <td>{p.name}</td>

  <td>

    
   <input
     step="0.1"
     style={{
  width: "100%",
  maxWidth: 80
}}
  type="number"
value={currentAllocated[p.name] ?? ""}

  onChange={(e) =>
    handleAllocated(p.name, e.target.value)
  }
/>
  </td>

  <td>
    {totalAllocatedToday(p.name)}
  </td>

  <td>
   <input
  type="number"
  step="0.1"
  style={{ width: 60 }}
  value={currentReturns[p.name] ?? ""}

  onChange={(e) =>
    handleReturns(p.name, e.target.value)
  }
/>
  </td>

  <td>{sold(p.name)}</td>

  <td>
    {amount(p.name, p.price)}
  </td>
</tr>
          ))}
        </tbody>
      </table>
</div>

      <h2>
        Total Amount: {totalAmount()}
      </h2>

      <hr />

      <h2>Payments</h2>

<input
  type="number"
  placeholder="Cash"
  value={currentCash}
 
  onChange={(e) => setCurrentCash(e.target.value)}
/>

      <br /><br />

<input
  type="number"
  placeholder="mpesa"
 value={currentMpesa}
 
  onChange={(e) =>
    setCurrentMpesa(e.target.value)
  }
  
/>
<br/><br/>

      <hr />

      <div style={{ border: "1px solid black", padding: 20, marginTop: 20 }}>
  <h2>Summary</h2>

  <p>
    Expected Amount: {totalAmount()}
  </p>



  <p>
    Paid Today: {totalPaid()}
  </p>

  <p>
    Debt Remaining: {debtRemaining()}
  </p>
</div>
        </>
)}
<button
  onClick={handleSave}
  disabled={saving}
>
  {saving
    ? "Saving..."
    : "Save Daily Operations"}
</button>
<br/><br/>

<button onClick={handleReset}>
  Clear Current Entry
</button>
<br/><br/>
<button onClick={handleResetDay}>
  Archive Day
</button>
<AppFooter />
    </div>
  );
}
