import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import AppFooter from "../components/AppFooter";
const agents = [
  "ALL",
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

export default function MonthlySummaryPage() {
  const [logs, setLogs] = useState([]);
  const [agent, setAgent] = useState("ALL");
  const [month, setMonth] = useState("2026-04");

  useEffect(() => {
    async function load() {
      const snapshot = await getDocs(collection(db, "dailyArchive"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setLogs(data);
    }

    load();
  }, []);

  const filtered = logs.filter((l) => {
    const matchesMonth = l.date?.startsWith(month);
    const matchesAgent = agent === "ALL" || l.agent === agent;
    return matchesMonth && matchesAgent;
  });

  function getValue(day, type, product) {
    return day?.[type]?.[product] || 0;
  }

  function calcDiff(day, product) {
    return (
      getValue(day, "allocated", product) -
      getValue(day, "returns", product)
    );
  }

  function sum(type, product) {
    return filtered.reduce((acc, day) => {
      return acc + getValue(day, type, product);
    }, 0);
  }

  function sumDiff(product) {
    return filtered.reduce((acc, day) => {
      return acc + calcDiff(day, product);
    }, 0);
  }

return (
  <div
    style={{
      padding: 15,
      paddingBottom: "100px"
    }}
  >
     

      <h1>Monthly Summary</h1>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={agent} onChange={(e) => setAgent(e.target.value)}>
          {agents.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13
          }}
        >
          <thead>
            <tr>
              <th>DATE</th>

              {products.map((p) => (
                <th key={p.name} colSpan={3}>
                  {p.name}
                </th>
              ))}
            </tr>

            <tr>
              <th></th>

              {products.map((p) => (
                <>
                  <th>T</th>
                  <th>R</th>
                  <th>D</th>
                </>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((day) => (
              <tr key={day.id}>
                <td>{day.id.split("-").slice(2).join("-")}</td>

                {products.map((p) => {
                  const taken = getValue(day, "allocated", p.name);
                  const returns = getValue(day, "returns", p.name);
                  const diff = taken - returns;

                  return (
                    <>
                      <td>{taken}</td>
                      <td>{returns}</td>
                      <td style={{ fontWeight: "bold", color: "#1a73e8" }}>
                        {diff}
                      </td>
                    </>
                  );
                })}
              </tr>
            ))}

            {/* TOTAL ROW */}
            <tr style={{ background: "#f5f5f5", fontWeight: "bold" }}>
              <td>TOTAL</td>

              {products.map((p) => {
                const t = sum("allocated", p.name);
                const r = sum("returns", p.name);
                const d = sumDiff(p.name);

                return (
                  <>
                    <td>{t}</td>
                    <td>{r}</td>
                    <td style={{ fontWeight: "bold", color: "green" }}>
                      {d}
                    </td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <AppFooter />
    </div>
  );
}