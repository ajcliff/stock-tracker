import { useEffect, useState } from "react";
import AppFooter from "../components/AppFooter";
import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

const agents = [
  "Ronnie Isaac",
  "Bernard Mbula",
  "Edward Kanyi"
];

export default function TransactionLogsPage() {
  const [logs, setLogs] = useState([]);
  const [selectedAgent, setSelectedAgent] =
    useState("all");

  useEffect(() => {
    async function loadLogs() {
      const snapshot = await getDocs(
        collection(
          db,
          "dailyOperations"
        )
      );

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

      setLogs(data);
    }

    loadLogs();
  }, []);

  const filteredLogs =
    selectedAgent === "all"
      ? logs
      : logs.filter(
          (log) =>
            log.agent ===
            selectedAgent
        );

return (
  <div
    style={{
      padding: 15,
      paddingBottom: "100px"
    }}
  >
      

      <h1>
        Transaction Logs
      </h1>

      <select
        value={selectedAgent}
        onChange={(e) =>
          setSelectedAgent(
            e.target.value
          )
        }
        style={{
          marginBottom: 20
        }}
      >
        <option value="all">
          All Agents
        </option>

        {agents.map((agent) => (
          <option
            key={agent}
            value={agent}
          >
            {agent}
          </option>
        ))}
      </select>

      <div
        style={{
          overflowX: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
            minWidth: "600px"
          }}
          border="1"
          cellPadding="10"
        >
          <thead>
            <tr>
              <th>Agent</th>
              <th>Total Sold</th>
              <th>Cash</th>
              <th>Mpesa</th>
              <th>Debt</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map(
              (log) => (
                <tr
                  key={log.id}
                >
                  <td>
                    {log.agent}
                  </td>

                  <td>
                    {log.totalAmount ||
                      0}
                  </td>

                  <td>
                    {log.cashPaid ||
                      0}
                  </td>

                  <td>
                    {log.mpesaPaid ||
                      0}
                  </td>

                  <td>
                    {log.debt ||
                      0}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <AppFooter />
    </div>
  );
}
